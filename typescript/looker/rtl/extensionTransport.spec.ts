/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { DefaultSettings } from './apiSettings'
import { ExtensionTransport } from './extensionTransport'
import { IHostConnection } from './extensionSdk'

describe('ExtensionTransport', () => {
  const queryParams = {a:"b c", d: false, nil: null, skip: undefined}
  const body = {song: 'how much is that doggy'}
  let transport: ExtensionTransport
  let connection: IHostConnection
  let mockRequest: any
  const streamCallback = (readable: any) => { return new Promise((resolve, reject) => reject())}

  beforeEach(() => {
    mockRequest = jest.fn()
    connection = { request: mockRequest} as IHostConnection
    const settings = DefaultSettings()
    transport = new ExtensionTransport(settings, connection)
  })

  it('makes a host request', async () => {
    try {
      await transport.request(
        'POST',
        '/path',
        queryParams,
        body
      )
      // empty query params are stripped
      expect(mockRequest).toHaveBeenCalledWith("POST", "/path", {"a": "b c"}, {"song": "how much is that doggy"}, undefined, undefined)
    } catch (error) {
      fail(error)
    }

  })

  it('stream not supported',  async () => {
    try {
      await transport.stream(
        streamCallback,
        'GET',
        '/path'
      )
      fail('stream should fail')
    } catch (error) {
      expect(error).toEqual('stream not supported')
    }
  })

})