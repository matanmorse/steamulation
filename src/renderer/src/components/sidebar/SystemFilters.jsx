const SystemFilters = ({filters, addFilter, removeFilter}) => {
    const system_colors = [
        ['NES',             '#f472b6'],
        ['SNES',            '#c4b5fd'],
        ['Gameboy',         '#86efac'],
        ['Gameboy Advance', '#6ee7b7'],
        ['Gameboy Color',   '#67e8f9'],
        ['Gamecube',        '#93c5fd'],
        ['Nintendo 64',     '#a78bfa'],
        ['Nintendo DS',     '#e879f9'],
        ['Nintendo 3DS',    '#fbbf24'],
        ['Wii',             '#fb923c'],
        ['PS1',             '#f87171'],
        ['PS2',             '#4ade80'],
        ['PS3',             '#f9a8d4'],
    ]
    return (
        <div className="systems">
            {system_colors.map(([name, color]) => (
                <div className={`system-chip ${filters.includes(name) && 'selected'}`} key={name} onClick={() => {
                   if (!filters.includes(name)) addFilter(name);
                }}>
                    <div className="chip-left" style={{ backgroundColor: color }}></div>
                    {name}
                    {filters.includes(name) && <i className="bi bi-x" onClick={() => removeFilter(name)}></i>}
                </div>
            ))}
        </div>
    )
}

export default SystemFilters;