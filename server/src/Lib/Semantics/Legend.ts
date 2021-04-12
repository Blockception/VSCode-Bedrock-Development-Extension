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
