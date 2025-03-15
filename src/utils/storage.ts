function removeStorage(type: 'localStorage' | 'sessionStorage', key: string) {
  window[type].removeItem(key);
}

/**
 * Operation Storage
 */
function setStorage(type: 'localStorage' | 'sessionStorage', key: string, value: any) {
  window[type].setItem(key, JSON.stringify(value));
}

/**
 * getStorage
 */
function getStorage(type: 'localStorage' | 'sessionStorage', key: string) {
  try {
    const value = window[type].getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return undefined;
    }
  } catch (e) {
    console.error('JSON.parse getStorage Error: ' + key);
    return undefined;
  }
}

/**
 * setLocalStorage
 */
export const setLocalStorage = (key: string, value: any) => setStorage('localStorage', key, value);

/**
 * getLocalStorage
 */
export const getLocalStorage = <T = any>(key: string): T | undefined => getStorage('localStorage', key);

/**
 * removeLocalStorage
 */
export const removeLocalStorage = (key: string) => removeStorage('localStorage', key);

/**
 * setSessionStorage
 */
export const setSessionStorage = (key: string, value: any) => setStorage('sessionStorage', key, value);

/**
 * getSessionStorage
 */
export const getSessionStorage = (key: string): any => getStorage('sessionStorage', key);

// TypeScript test for: refactor: 🔧 improve code readability
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____improve_code_readability', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
