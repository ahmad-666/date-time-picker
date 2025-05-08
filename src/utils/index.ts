//* Random ................................
export const getRand = (min: number = 0, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
//* Arrays,Objects ...........................
export const compareObjectsArrays = <T1 extends { [key: string]: any }, T2 extends { [key: string]: any }>({
    arr1 = [],
    arr2 = [],
    key
}: {
    arr1: T1[];
    arr2: T2[];
    key: string;
}): boolean => {
    if (arr1.length === arr2.length) {
        const arr1Keys = arr1.map((a1) => a1[key]);
        const arr2Keys = arr2.map((a2) => a2[key]);
        return arr1Keys.length === arr1Keys.filter((a1) => arr2Keys.includes(a1)).length;
    }
    return false;
};
//* Example:
// compareObjectsArrays({arr1: [{ id: 1 }, { id: 2 }],arr2: [{ id: 2 }, { id: 1 }],key: 'id'})
export const arrayToChunks = <T>({ arr = [], chunkSize }: { arr: T[]; chunkSize: number }) => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) chunks.push(arr.slice(i, i + chunkSize));
    return chunks;
};
//* Example:
//arrayToChunks({ arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], chunkSize: 4 }) --> [[1,2,3,4],[5,6,7,8],[9,10]]
export const repeatArray = <T>({ arr = [], repeat }: { arr: T[]; repeat: number }) => {
    let result = [...arr];
    for (let i = 0; i < repeat; i++) result = [...result, ...arr];
    return result;
};
//* Example:
//repeatArray({arr:[1,2,3],repeat:2})
//* Domain & URL ..............................
export const getDomain = (value: string): string => {
    // use this if we have string value that we don't know if it is domain or url and
    // we always want to return domain
    // value can be url like 'https://google.com' or domain like 'google.com'
    try {
        if (value.startsWith('http://') || value.startsWith('https://'))
            return new URL(value).hostname; //we are now sure that url is valid
        else return value;
    } catch (err) {
        return '';
    }
};
//* Example:
// getDomain('https://domain.com') --> 'domain.com'
// getDomain('domain.com') --> 'domain.com'
//* Download ........................................
export const generateDownloadLink = ({
    data,
    target = '_blank',
    filename,
    extension
}: {
    data: File | Buffer;
    target?: '_self' | '_blank';
    filename?: string;
    extension?: string;
}) => {
    const link = document.createElement('a');
    const blob = new Blob([data]);
    const href = URL.createObjectURL(blob);
    link.target = target;
    link.download = filename && extension ? `${filename}.${extension}` : '';
    link.href = href;
    link.click();
    link.remove();
};
//* Example:
// const excel = await axios.get(url,{responseType:'blob'})
// generateDownloadLink({data: excel,target: '_blank',filename: 'file-name',extension: 'xlsx'
// });

//* Get 2-digit country code and return country emoji flag code ........................................
export const getCountryFlagEmoji = (code: string) => {
    const codePoints = code
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};
