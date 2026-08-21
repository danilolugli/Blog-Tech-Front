import { useEffect } from "react";
import styles from "./ConfirmModal.module.css";

type ConfirmModalVariant = "danger" | "warning" | "info";

export interface ConfirmModalProps {
  /** Controla se o modal está visível */
  isOpen: boolean;
  /** Título exibido no topo do modal (ex: "Excluir Post?") */
  title: string;
  /** Texto/descrição exibido abaixo do título */
  message: string;
  /** Texto do botão de confirmação (padrão: "Excluir") */
  confirmText?: string;
  /** Texto do botão de cancelamento (padrão: "Cancelar") */
  cancelText?: string;
  /** Cor/tema do ícone e do botão de confirmação (padrão: "danger") */
  variant?: ConfirmModalVariant;
  /** Desabilita os botões e mostra estado de carregamento (ex: aguardando request) */
  isLoading?: boolean;
  /** Chamado ao clicar em "Cancelar", fechar no overlay ou pressionar Esc */
  onCancel: () => void;
  /** Chamado ao clicar no botão de confirmação (ex: "Excluir") */
  onConfirm: () => void;
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.3 2.25h17.76a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Excluir",
  cancelText = "Cancelar",
  variant = "danger",
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div className={styles.card} role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title">
        <div className={styles.lineTitle}>
            <div className={`${styles.iconWrapper} ${styles[`iconWrapper--${variant}`]}`}>
                <WarningIcon />
            </div>

            <h2 id="confirm-modal-title" className={styles.title}>
                {title}
            </h2>
        </div>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.confirmButton} ${styles[`confirmButton--${variant}`]}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Aguarde..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}