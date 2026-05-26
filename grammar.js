module.exports = grammar({
  name: 'renpy',

  extras: $ => [
    /[ \t]/,        // ignore spaces and tabs
    /\r?\n[ \t]*/,  // ignore newlines with leading whitespace
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.label_statement,
      $.say_statement,
      $.jump_statement,
      $.call_statement,
      $.scene_statement,
      $.show_statement,
      $.hide_statement,
      $.python_line,
      $.python_block,
      $.menu_statement,
      $.init_statement,
      $.return_statement,
      $.pause_statement,
      $.comment,
    ),

    // ── Core Statements ──────────────────────────────────────

    label_statement: $ => seq(
      'label',
      $.identifier,
      ':',
    ),

    say_statement: $ => choice(
      $.string,
      seq($.identifier, $.string),
    ),

    jump_statement: $ => seq(
      'jump',
      $.identifier,
    ),

    call_statement: $ => seq(
      'call',
      $.identifier,
    ),

    return_statement: $ => 'return',

    pause_statement: $ => seq(
      'pause',
      optional($.number),
    ),

    // ── Scene/Show/Hide ───────────────────────────────────────
    
    scene_statement: $ => seq(
      'scene',
      $.image_name,
    ),

    show_statement: $ => seq(
      'show',
      $.image_name,
    ),

    hide_statement: $ => seq(
      'hide',
      $.image_name,
    ),

    menu_statement: $ => seq(
      'menu',
      ':',
      $.indented_block,
    ),

    menu_choice: $ => prec.left(seq(
      $.string,
      ':',
      repeat($._statement),
    )),

    // ── Inline Python ─────────────────────────────────────────

    python_line: $ => seq(
      '$',
      $.python_content,
    ),

    python_block: $ => seq(
      'python',
      ':',
      $.indented_block,
    ),

    init_statement: $ => choice(
      // init python:
        //     code
        seq(
          'init',
          'python',
          ':',
          $.indented_block,
        ),
        // init:
        //     code
        seq(
          'init',
          ':',
          $.indented_block,
        ),
        // init 5 python:  (with priority number)
        seq(
          'init',
          $.number,
          'python',
          ':',
          $.indented_block,
        ),
    ),

    indented_block: $ => /(\n[ \t]+.+)+/,

    python_content: $ => /.+/,

    // image_name is a sequence of identifiers on the same line
    image_name: $ => prec.left(repeat1($.identifier)),

    // ── Primitives ────────────────────────────────────────────

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    string: $ => choice(
      seq('"', /[^"]*/, '"'),
      seq("'", /[^']*/, "'"),
    ),

    comment: $ => /#[^\n]*/,

    number: $ => /\d+(\.\d+)?/,
  }
});