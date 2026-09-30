import {
  Droplets, Ruler, GitBranch, ShieldCheck, Wrench, Siren,
  Award, Clock, CheckCircle2, Heart, Zap, Target, Eye,
  Gauge, Leaf, TrendingUp, Phone, Mail, MapPin, Star,
  Sparkles, AlertCircle, ArrowRight, ArrowLeft, ChevronRight,
  Send, Loader2, Plus, Trash2, Edit, X, Save, LayoutDashboard,
  Settings, LogOut, MessageSquare, Briefcase, Users, Image,
  FileText, ListChecks, type LucideIcon,
  Factory, Fuel, FlaskConical, Mountain, HardHat, BadgeCheck,
  Cpu, Lightbulb, Handshake, Gem, Cylinder, Crosshair, ScanLine,
  Waves, LifeBuoy, Container, Microscope, Scale, Timer,
  CircuitBoard, Rocket, Atom, Pickaxe,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  Droplets, Ruler, GitBranch, ShieldCheck, Wrench, Siren,
  Award, Clock, CheckCircle2, Heart, Zap, Target, Eye,
  Gauge, Leaf, TrendingUp, Phone, Mail, MapPin, Star,
  Sparkles, AlertCircle, ArrowRight, ArrowLeft, ChevronRight,
  Send, Loader2, Plus, Trash2, Edit, X, Save, LayoutDashboard,
  Settings, LogOut, MessageSquare, Briefcase, Users, Image,
  FileText, ListChecks,
  Factory, Fuel, FlaskConical, Mountain, HardHat, BadgeCheck,
  Cpu, Lightbulb, Handshake, Gem, Cylinder, Crosshair, ScanLine,
  Waves, LifeBuoy, Container, Microscope, Scale, Timer,
  CircuitBoard, Rocket, Atom, Pickaxe,
};

export const iconNames = Object.keys(iconMap).sort();

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Droplets;
}
