"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/app/logo";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);


  const handleSignIn = async () => {
    if (auth) {
      try {
        await signInWithPopup(auth, provider);
        router.push('/dashboard');
      } catch (error) {
        console.error("Error signing in with Google", error);
      }
    }
  };

  if (loading || user) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <p>Cargando...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
      backgroundSize: '2rem 2rem'
    }}>
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Iniciar Sesión</CardTitle>
          <CardDescription>
            Acceda al sistema de gestión académica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={handleSignIn} className="w-full">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.5 109.8 11.8 244 11.8c70.3 0 129.5 27.8 174.9 72.8l-67.9 67.9C293.5 112.5 270.8 96.2 244 96.2c-76.3 0-138.4 62.1-138.4 138.4s62.1 138.4 138.4 138.4c87.3 0 119.2-64.8 123.1-98.9H244v-73.4h238.9c4.9 26.3 7.1 54.4 7.1 82.9z"></path></svg>
                Iniciar Sesión con Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
