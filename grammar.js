module.exports = grammar({
  name: 'renpy',

  externals: $ => [
    $._newline,
    $._indent,
    $._dedent,
  ],

  extras: $ => [
    /[ \t]/,  // only spaces and tabs, NOT newlines
    $.comment, // comment would also categorized as extras
  ],

  conflicts: $ => [
    [$.label_statement], // it use optional($.block) in its structure so that's why
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
      $._newline,
      $.define_statement,
      $.default_statement,
      $.play_statement,
      $.stop_statement,
      $.queue_statement,
      $.with_statement,
    ),

    // ── Core Statements ──────────────────────────────────────

    label_statement: $ => seq(
      'label',
      $.identifier,
      ':',
      $._newline,
      optional($.block),
    ),

    say_statement: $ => choice(
      seq($.string, $._newline),
      seq($.identifier, $.string, $._newline),
    ),

    jump_statement: $ => seq(
      'jump',
      $.identifier,
      $._newline,
    ),

    call_statement: $ => seq(
      'call',
      $.identifier,
      $._newline,
    ),

    return_statement: $ => seq(
      'return',
      $._newline,
    ),

    pause_statement: $ => seq(
      'pause',
      optional($.number),
      $._newline,
    ),

    // ── Scene/Show/Hide ───────────────────────────────────────

    

    transform_property: $ => repeat1($.identifier),

    // ── Menu ─────────────────────────────────────────────────

    menu_statement: $ => seq(
      'menu',
      ':',
      $._newline,
      repeat($._newline),
      $._indent,
      repeat1($.menu_choice),
      $._dedent,
    ),

    menu_choice: $ => seq(
      $.string,
      ':',
      $._newline,
      optional($.block),
    ),

    // ── Blocks ───────────────────────────────────────────────

    block: $ => seq(
      repeat($._newline),
      $._indent,
      repeat1($._statement),
      $._dedent,
    ),

    // ── Python ───────────────────────────────────────────────

    python_line: $ => seq(
      '$',
      $.python_content,
      $._newline,
    ),

    python_block: $ => seq(
      'python',
      ':',
      $._newline,
      $.indented_block,
    ),

    init_statement: $ => choice(
      seq('init', 'python', ':', $._newline, $.indented_block),
      seq('init', ':', $._newline, $.block),
      seq('init', $.number, 'python', ':', $._newline, $.indented_block),
    ),

    // opaque block for raw python content
    indented_block: $ => seq(
      repeat($._newline),
      $._indent,
      repeat1(choice(
        seq($.python_content, $._newline),
        $._newline // letting a line only contains \n (empty line)
      )),
      $._dedent,
    ),

    python_content: $ => /[^\n]+/,

    // ── Variable Declaration ─────────────────────────────────────────────────
    define_statement: $ => seq(
      'define',
      field('name', $.dotted_name),
      '=',
      field('value', $.python_content),
    ),

    default_statement: $ => seq(
      'default',
      field('name', $.dotted_name),
      '=',
      field('value', $.python_content),
    ),

    // ── Audio ─────────────────────────────────────────────────
    play_statement: $ => seq(
      'play',
      field('channel', $.identifier),
      field('file', choice($.string, $.identifier)),
      // handle special keywords as "fadeout 1.0"
      repeat(choice(
        seq('fadein', $.number),
        seq('fadeout', $.number),
        seq('volume', $.number),
        'loop',
        'noloop',
      )),
    ),

    stop_statement: $ => seq(
      'stop',
      field('channel', $.identifier),
      // handle special keywords as "fadeout 1.0"
      repeat(choice(
        seq('fadein', $.number),
        seq('fadeout', $.number),
        seq('volume', $.number),
        'loop',
        'noloop',
      )),
    ),

    queue_statement: $ => seq(
      'queue',
      field('channel', $.identifier),
      field('file', choice($.string, $.identifier)),
      // handle special keywords as "fadeout 1.0"
      repeat(choice(
        seq('fadein', $.number),
        seq('fadeout', $.number),
        seq('volume', $.number),
        'loop',
        'noloop',
      )),
    ),

    // ── 3. Image Display ──────────────────────────────────────────

    image_name: $ => prec.left(repeat1($.identifier)),

    show_statement: $ => seq(
      'show',
      $.image_name,
      optional(seq('at', $.transform_property)),
      $._newline,
    ),

    scene_statement: $ => seq(
      'scene',
      $.image_name,
      optional(seq('at', $.transform_property)),
      $._newline,
    ),

    hide_statement: $ => seq(
      'hide',
      $.image_name,
      $._newline,
    ),

    // ── 3.1. With Statement ──────────────────────────────────────────
    with_statement: $ => seq(
      'with',
      field('transition', choice(
        $.dotted_name,
        'None',
      )),
    ),

    // ── Primitives ────────────────────────────────────────────

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    string: $ => choice(
      seq('"', /[^"]*/, '"'),
      seq("'", /[^']*/, "'"),
    ),

    comment: $ => /#[^\n]*/,

    number: $ => /\d+(\.\d+)?/,

    dotted_name: $ => seq(
      $.identifier,
      repeat(seq('.', $.identifier)),
    ),
  }
});