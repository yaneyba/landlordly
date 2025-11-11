import type { IDataProvider } from './IDataProvider';
import { MockDataProvider } from './MockDataProvider';

/**
 * DataProviderFactory - Factory pattern for creating data provider instances
 * This allows easy switching between different data sources (mock, API, etc.)
 */
export type DataProviderType = 'mock' | 'api';

export class DataProviderFactory {
  private static instance: IDataProvider | null = null;
  private static currentType: DataProviderType = 'mock';

  /**
   * Get the current data provider instance
   * Uses singleton pattern to ensure only one instance exists
   */
  static getProvider(): IDataProvider {
    if (!this.instance) {
      this.instance = this.createProvider(this.currentType);
    }
    return this.instance;
  }

  /**
   * Create a new data provider of the specified type
   */
  private static createProvider(type: DataProviderType): IDataProvider {
    switch (type) {
      case 'mock':
        return new MockDataProvider();
      case 'api':
        // In a real application, you would implement an API data provider here
        // For now, fall back to mock data
        console.warn('API provider not implemented, using mock data');
        return new MockDataProvider();
      default:
        throw new Error(`Unknown provider type: ${type}`);
    }
  }

  /**
   * Switch to a different data provider type
   * This will create a new instance of the specified provider
   */
  static setProviderType(type: DataProviderType): void {
    this.currentType = type;
    this.instance = this.createProvider(type);
  }

  /**
   * Reset the factory (useful for testing)
   */
  static reset(): void {
    this.instance = null;
    this.currentType = 'mock';
  }
}
