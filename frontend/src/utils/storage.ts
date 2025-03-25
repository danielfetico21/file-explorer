/**
 * Wrapper pentru localStorage
 * - Tipat generic (cu T)
 * - Tratează fallback elegant
 */
export const storage = {
  /**
   * Obține o valoare din localStorage și o parsează ca JSON
   * @param key Cheia sub care este salvată valoarea
   * @returns Valoarea parse-ată sau null dacă nu există sau e invalidă
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  /**
   * Salvează o valoare în localStorage, convertind-o în JSON
   * @param key Cheia sub care va fi salvată valoarea
   * @param value Valoarea care trebuie stocată
   */
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Elimină o valoare din localStorage
   * @param key Cheia care trebuie ștearsă
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
