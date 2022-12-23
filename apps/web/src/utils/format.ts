export function formatCurrency(value: number, prefix?: string, unit?: string) {
    if (!value || Number(value) === 0) {
        return prefix || 'Free'
    }
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${unit || ''}`
}
