import { describe, expect, it } from 'vitest'
import { isLoopbackUrl, keyOptional } from './localEndpoint'

describe('isLoopbackUrl', () => {
  it('accepts loopback HTTP and HTTPS endpoints', () => {
    expect(isLoopbackUrl('http://127.0.0.1:11434/v1')).toBe(true)
    expect(isLoopbackUrl('http://127.0.0.2:1234/v1')).toBe(true)
    expect(isLoopbackUrl('http://localhost:8000/v1')).toBe(true)
    expect(isLoopbackUrl('https://localhost/v1')).toBe(true)
    expect(isLoopbackUrl('http://[::1]:11434/v1')).toBe(true)
  })

  it('rejects remote and malformed endpoints', () => {
    expect(isLoopbackUrl('https://api.openai.com/v1')).toBe(false)
    expect(isLoopbackUrl('http://192.168.0.5:8000/v1')).toBe(false)
    expect(isLoopbackUrl('127.0.0.1:11434')).toBe(false)
    expect(isLoopbackUrl('')).toBe(false)
  })
})

describe('keyOptional', () => {
  it('allows a blank key only for loopback custom or ollama endpoints', () => {
    expect(keyOptional('ollama', 'http://127.0.0.1:11434/v1')).toBe(true)
    expect(keyOptional('custom', 'http://localhost:1234/v1')).toBe(true)
    expect(keyOptional('custom', 'https://proxy.example/v1')).toBe(false)
    expect(keyOptional('openai', 'http://127.0.0.1:11434/v1')).toBe(false)
  })
})
