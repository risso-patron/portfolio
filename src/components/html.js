// Utilidades mínimas para generar HTML seguro.

/** Escapa texto para usarlo en atributos o como texto plano. */
export function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Atributos para un enlace externo con texto accesible del aviso. */
export const EXT = 'target="_blank" rel="noopener noreferrer"';
