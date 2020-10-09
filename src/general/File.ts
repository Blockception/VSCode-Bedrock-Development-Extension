
export function GetFilename(filepath : string) : string{
    let index = filepath.lastIndexOf('\\');

    if (index > -1){
        filepath = filepath.substring(index + 1, filepath.length);
    }

    index = filepath.lastIndexOf('.');

    if (index > -1){
        filepath = filepath.substring(0, index);
    }

    return filepath.trim();
}