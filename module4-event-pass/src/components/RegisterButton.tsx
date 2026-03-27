// =============================================================================
// COMPONENTE REGISTER BUTTON - Module 4: Event Pass
// =============================================================================
// Botón para registrarse en un evento con actualización optimista.
//
// ## useOptimistic (React 19)
// Este hook permite actualizar la UI inmediatamente antes de que
// la operación del servidor complete. Si falla, React revierte
// automáticamente al estado anterior.
//
// ## Patrón de Actualización Optimista
// 1. Usuario hace clic
// 2. UI se actualiza inmediatamente (optimistic)
// 3. Server Action se ejecuta
// 4. Si falla, UI se revierte automáticamente
// 5. Si éxito, estado se confirma
// =============================================================================

'use client';

import { useOptimistic, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { registerForEventAction } from '@/actions/eventActions';
import { Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface RegisterButtonProps {
  eventId: string;
  availableSpots: number;
  isAvailable: boolean;
}

/**
 * Botón de registro con actualización optimista.
 *
 * ## Flujo
 * 1. Al hacer clic, `addOptimistic` actualiza spots inmediatamente (-1)
 * 2. `startTransition` inicia la Server Action
 * 3. Mientras pending=true, mostramos spinner
 * 4. Si falla, React revierte automáticamente
 */
export function RegisterButton({
  eventId,
  availableSpots,
  isAvailable,
}: RegisterButtonProps): React.ReactElement {
  /** Exito o fracaso al momento de registrar */
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');


  /**
   * useTransition permite marcar actualizaciones como no urgentes.
   * isPending indica si hay una transición en progreso.
   */
  const [isPending, startTransition] = useTransition();

  /**
   * useOptimistic crea un estado optimista.
   *
   * @param initialValue - Valor inicial (plazas disponibles)
   * @param reducer - Función que calcula el nuevo valor optimista
   */
  const [optimisticSpots, addOptimistic] = useOptimistic(
    availableSpots,
    // Reducer: cuando se registra, restamos 1
    (currentSpots: number, _action: 'register') => Math.max(0, currentSpots - 1)
  );

  // Estado derivado
  const showRegistered = status === 'success';
  const canRegister = isAvailable && optimisticSpots > 0 && status !== 'success';

  /**
   * Handler del registro.
   */
  async function handleRegister(): Promise<void> {
    // 1. Actualización optimista inmediata
    

    // 2. Ejecutar Server Action en una transición
    startTransition(async () => {
      addOptimistic('register');
      const result = await registerForEventAction(eventId);

      if (!result.success) {
        // Si falla, podríamos mostrar un toast de error
        // El estado optimista se revierte automáticamente
        setStatus('error');
        return;
      }

      setStatus('success');
    });
  }

  // Si ya se registró (optimísticamente)
  if (showRegistered) {
    return (
      <Button variant="secondary" disabled className="w-full gap-2">
        <CheckCircle className="h-4 w-4" />
        ¡Registrado!
      </Button>
    );
  }

  // Si no hay plazas
  if (!canRegister) {
    return (
      <Button variant="secondary" disabled className="w-full">
        {optimisticSpots === 0 ? 'Evento Agotado' : 'No disponible'}
      </Button>
    );
  }

  

  return (
    <div className="w-full space-y-2">
    {status === 'error' && (
      <p className="text-sm text-red-500">
        Error al registrarse. Intenta de nuevo.
      </p>
    )}



    <Button
      onClick={handleRegister}
      disabled={isPending || !canRegister}
      className={cn('w-full gap-2', isPending && 'cursor-wait')}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Registrando...
        </>
      ) : (
        `Registrarme (${optimisticSpots} plazas)`
      )}
    </Button>
    </div>
  );
}
