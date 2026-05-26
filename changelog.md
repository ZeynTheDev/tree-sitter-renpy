# Changelog

## v0.1.0 - Initial Release

### Supported
- Label statements (`label`)
- Say statements (narrator and character dialogue)
- Jump and call statements
- Scene, show, hide statements (single identifier image names)
- Inline Python (`$`)
- Menu blocks (single level, choices without nested statement parsing)
- Python blocks (`python:`, `init python:`)
- Return and pause statements
- Comments (`#`)

### Known Issues
- Multi-word image names (`show eileen happy`) are not supported yet.
  Use underscored names (`show eileen_happy`) as a workaround.
- Block contents inside `menu`, `python:`, and `init` are treated as
  opaque text rather than parsed statements. This means nested
  statements won't be individually highlighted or navigable.
- Indentation-based block structure is not fully parsed. This requires
  an external scanner (planned for v0.2.0).

### Planned for v0.2.0
- External scanner for proper indent/dedent handling
- Multi-word image names support
- Proper nested block parsing