import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit, X, Save, Loader2, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'icon' | 'array' | 'select';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface CrudManagerProps {
  table: string;
  title: string;
  description: string;
  fields: FieldDef[];
  displayFields: { key: string; label: string }[];
  orderField?: string;
}

export default function CrudManager({
  table, title, description, fields, displayFields, orderField = 'sort_order',
}: CrudManagerProps) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchRows = async () => {
    const { data } = await supabase.from(table).select('*').order(orderField, { ascending: true });
    setRows((data ?? []) as Record<string, unknown>[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, [table, orderField]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');

    const id = editing.id as string | undefined;
    const payload: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (editing[f.key] !== undefined) payload[f.key] = editing[f.key];
    });
    if (!id) {
      payload[orderField] = rows.length + 1;
    }

    const { error: err } = id
      ? await supabase.from(table).update(payload).eq('id', id)
      : await supabase.from(table).insert(payload);

    if (err) {
      setError(err.message);
      setSaving(false);
    } else {
      setEditing(null);
      setSaving(false);
      fetchRows();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetchRows();
  };

  const moveRow = async (id: string, direction: 'up' | 'down') => {
    const sortedRows = [...rows];
    const idx = sortedRows.findIndex((r) => r.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sortedRows.length) return;

    const current = sortedRows[idx];
    const target = sortedRows[swapIdx];
    const currentOrder = current[orderField] as number;
    const targetOrder = target[orderField] as number;

    await Promise.all([
      supabase.from(table).update({ [orderField]: targetOrder }).eq('id', id),
      supabase.from(table).update({ [orderField]: currentOrder }).eq('id', target.id as string),
    ]);
    fetchRows();
  };

  const renderField = (field: FieldDef): ReactNode => {
    if (!editing) return null;
    const value = editing[field.key];

    const update = (val: unknown) => {
      setEditing({ ...editing, [field.key]: val });
    };

    if (field.type === 'textarea') {
      return (
        <textarea
          value={(value as string) ?? ''}
          onChange={(e) => update(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          placeholder={field.placeholder}
        />
      );
    }

    if (field.type === 'number') {
      return (
        <input
          type="number"
          value={(value as number) ?? ''}
          onChange={(e) => update(Number(e.target.value))}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      );
    }

    if (field.type === 'icon') {
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => update(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="">Pilih ikon...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (field.type === 'select') {
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => update(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="">Pilih...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (field.type === 'array') {
      const arr = (value as string[]) ?? [];
      return (
        <div className="space-y-2">
          {arr.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newArr = [...arr];
                  newArr[i] = e.target.value;
                  update(newArr);
                }}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <button
                onClick={() => update(arr.filter((_, idx) => idx !== i))}
                className="rounded-lg border border-neutral-300 p-2 text-neutral-500 hover:bg-error-50 hover:text-error-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => update([...arr, ''])}
            className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Item
          </button>
        </div>
      );
    }

    return (
      <input
        type="text"
        value={(value as string) ?? ''}
        onChange={(e) => update(e.target.value)}
        className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        placeholder={field.placeholder}
      />
    );
  };

  const newRow = (): Record<string, unknown> => {
    const row: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === 'array') row[f.key] = [];
      else if (f.type === 'number') row[f.key] = 0;
      else row[f.key] = '';
    });
    return row;
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900">{title}</h1>
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        </div>
        <button
          onClick={() => setEditing(newRow())}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-neutral-700">Urutan</th>
                {displayFields.map((f) => (
                  <th key={f.key} className="px-4 py-3 font-semibold text-neutral-700">{f.label}</th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-neutral-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={displayFields.length + 2} className="px-4 py-12 text-center text-neutral-400">
                    Belum ada data. Klik "Tambah" untuk membuat.
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr key={row.id as string} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveRow(row.id as string, 'up')}
                          disabled={i === 0}
                          className="rounded p-1 text-neutral-400 hover:text-primary-600 disabled:opacity-30"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => moveRow(row.id as string, 'down')}
                          disabled={i === rows.length - 1}
                          className="rounded p-1 text-neutral-400 hover:text-primary-600 disabled:opacity-30"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    {displayFields.map((f) => {
                      const val = row[f.key];
                      const display = Array.isArray(val) ? `${val.length} item` : String(val ?? '');
                      return (
                        <td key={f.key} className="max-w-xs truncate px-4 py-3 text-neutral-700">
                          {display}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(row)}
                          className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id as string)}
                          className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-error-50 hover:text-error-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/50" onClick={() => setEditing(null)} />
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
              <h2 className="text-lg font-bold text-neutral-900">
                {editing.id ? 'Edit' : 'Tambah'} {title}
              </h2>
              <button onClick={() => setEditing(null)} className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              {error && (
                <div className="flex items-start gap-3 rounded-lg border border-error-200 bg-error-50 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-600" />
                  <p className="text-sm text-error-700">{error}</p>
                </div>
              )}

              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-neutral-700">
                    {field.label}
                    {field.required && <span className="text-error-500"> *</span>}
                  </label>
                  <div className="mt-1.5">{renderField(field)}</div>
                </div>
              ))}

              <div className="flex justify-end gap-3 border-t border-neutral-200 pt-4">
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
