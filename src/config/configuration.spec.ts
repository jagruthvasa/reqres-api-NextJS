/* eslint-disable prettier/prettier */
import configuration from './configuration';

describe('Configuration', () => {
  it('should return configuration object', () => {
    const config = configuration();
    expect(config).toHaveProperty('port');
    expect(config).toHaveProperty('database');
    expect(config).toHaveProperty('rabbitmq');
    expect(config).toHaveProperty('reqres');
  });
});