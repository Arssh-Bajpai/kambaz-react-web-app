let numberArray1 = [1, 2, 4, 5, 6];
let stringArray1 = ['string1', 'string3'];

export default function FindIndex() {
    const fourIndex = numberArray1.findIndex(a => a === 4);
    const string3Index = stringArray1.findIndex(a => a === 'string3');

    return (
        <div id="wd-find-index">
            <h4>Find Index</h4>
            Index of 4 in numberArray1: {fourIndex} <br />
            Index of 'string3' in stringArray1: {string3Index} <hr />
        </div>
    );
}
