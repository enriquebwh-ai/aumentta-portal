"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email === "demo@aumentta.com" && password === "demo123") {
        toast.success("Bienvenido al portal de cliente");
        router.push("/dashboard");
      } else {
        toast.error("Credenciales inválidas. Usa: demo@aumentta.com / demo123");
      }
    } catch {
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Aumentta</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Tu portal de cliente<br />para transformación digital
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Gestiona tus proyectos, comunícate con tu equipo y haz seguimiento del progreso en un solo lugar.
          </p>
        </div>

        <p className="text-white/60 text-sm">
          © 2025 Aumentta Strategy Advisors
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-2 lg:hidden mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Aumentta</span>
              </div>
              <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
              <CardDescription>
                Accede a tu portal de cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" loading={loading}>
                  Entrar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Demo credentials:</p>
                <p className="text-xs font-mono text-gray-600">demo@aumentta.com / demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
