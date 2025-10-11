export function getInitials(name: string): string {
    return name
        .trim() // quita espacios extras
        .split(/\s+/) // divide por uno o más espacios
        .map((word) => word[0]?.toUpperCase() ?? '') // toma la primera letra y la pasa a mayúscula
        .join(''); // une todas las letras
}
