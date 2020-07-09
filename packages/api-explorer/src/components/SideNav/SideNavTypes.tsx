/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { FC, useContext } from 'react'
import { Sidebar, SidebarItem } from '@looker/components'
import { TypeList, IntrinsicType } from '@looker/sdk-codegen'
import { NavLink } from 'react-router-dom'

import { buildTypePath, highlightHTML } from '../../utils'
import { SearchContext } from '../../context'
import { ApixHeading } from '../common'

interface TypeProps {
  specKey: string
  types: TypeList
}

export const SideNavTypes: FC<TypeProps> = ({ types, specKey }) => {
  const {
    searchSettings: { pattern },
  } = useContext(SearchContext)

  return (
    <Sidebar>
      {Object.values(types)
        .filter((type) => !(type instanceof IntrinsicType))
        .map((type) => (
          <NavLink key={type.name} to={buildTypePath(specKey, type.name)}>
            <SidebarItem as="span">
              <ApixHeading as="h5" mb="0" pt="0" fontWeight="light" truncate>
                {highlightHTML(pattern, type.name)}
              </ApixHeading>
            </SidebarItem>
          </NavLink>
        ))}
    </Sidebar>
  )
}