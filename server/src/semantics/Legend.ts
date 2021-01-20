/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

/**KEEP THE ORDER OF THESE

/**
 *
 */
export const SemanticTokens = [
  /**For identifiers that declare or reference a namespace, module or package.*/
  "namespace",
  /**For identifiers that declare of reference a class type.*/
  "class",
  /**For identifiers that declare of reference an enumeration type.*/
  "enum",
  /**For identifiers that declare of reference an struct type.*/
  "struct",
  /**For identifiers that declare of reference an interface type.*/
  "interface",
  /**For identifiers that declare of reference a type parameter.*/
  "typeParameter",
  /**For identifiers that declare of reference a type that is not covered above.*/
  "type",
  /**For identifiers that declare of reference a function or method parameters.*/
  "parameter",
  /**For identifiers that declare of reference a local or global variable.*/
  "variable",
  /**For identifiers that declare of reference a member property, member field or member variable.*/
  "property",
  /**For identifiers that declare of enumeration property, constant or member.*/
  "enumMember",
  /**For identifiers that declare of enumeration property.*/
  "event",
  /**For identifiers that declare a function.*/
  "function",
  /**For identifiers that declare a member function or method.*/
  "method",
  /**For identifiers that declare a macro.*/
  "macro",
  /**For identifiers that declare a label.*/
  "label",
  /**For tokens that represent a comment.*/
  "comment",
  /**For tokens that represent a string literal.*/
  "string",
  /**For tokens that represent a language keyword.*/
  "keyword",
  /**For tokens that represent a number literal.*/
  "number",
  /**For tokens that represent a regular expression literal.*/
  "regexp",
  /**For tokens that represent an operator.*/
  "operator",
];

/**
 *
 */
export enum SemanticTokensEnum {
  /**For identifiers that declare or reference a namespace, module or package.*/
  namespace,
  /**For identifiers that declare of reference a class type.*/
  class,
  /**For identifiers that declare of reference an enumeration type.*/
  enum,
  /**For identifiers that declare of reference an struct type.*/
  struct,
  /**For identifiers that declare of reference an interface type.*/
  interface,
  /**For identifiers that declare of reference a type parameter.*/
  typeParameter,
  /**For identifiers that declare of reference a type that is not covered above.*/
  type,
  /**For identifiers that declare of reference a function or method parameters.*/
  parameter,
  /**For identifiers that declare of reference a local or global variable.*/
  variable,
  /**For identifiers that declare of reference a member property, member field or member variable.*/
  property,
  /**For identifiers that declare of enumeration property, constant or member.*/
  enumMember,
  /**For identifiers that declare of enumeration property.*/
  event,
  /**For identifiers that declare a function.*/
  function,
  /**For identifiers that declare a member function or method.*/
  method,
  /**For identifiers that declare a macro.*/
  macro,
  /**For identifiers that declare a label.*/
  label,
  /**For tokens that represent a comment.*/
  comment,
  /**For tokens that represent a string literal.*/
  string,
  /**For tokens that represent a language keyword.*/
  keyword,
  /**For tokens that represent a number literal.*/
  number,
  /**For tokens that represent a regular expression literal.*/
  regexp,
  /**For tokens that represent an operator.*/
  operator,
}

/**
 *
 */
export const SemanticModifiers = [
  /**For declarations of symbols.*/
  "declaration",
  /**For definitions of symbols, e.g. in header files.*/
  "definition",
  /**For readonly variables and member fields a.k.a. constants.*/
  "readonly",
  /**For class members a.k.a static members.*/
  "static",
  /**For symbols that should no longer be used.*/
  "deprecated",
  /**For types and member functions that are abstract.*/
  "abstract",
  /**For functions that are marked async.*/
  "async",
  /**For variable references where the variable is assigned to.*/
  "modification",
  /**For occurrences of symbols in documentation.*/
  "documentation",
  /**For symbols that are part of the standard library.*/
  "defaultLibrary",
];

/**
 *
 */
export enum SemanticModifiersEnum {
  /**For declarations of symbols.*/
  declaration,
  /**For definitions of symbols, e.g. in header files.*/
  definition,
  /**For readonly variables and member fields a.k.a. constants.*/
  readonly,
  /**For class members a.k.a static members.*/
  static,
  /**For symbols that should no longer be used.*/
  deprecated,
  /**For types and member functions that are abstract.*/
  abstract,
  /**For functions that are marked async.*/
  async,
  /**For variable references where the variable is assigned to.*/
  modification,
  /**For occurrences of symbols in documentation.*/
  documentation,
  /**For symbols that are part of the standard library.*/
  defaultLibrary,
}
