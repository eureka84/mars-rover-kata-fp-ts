import {fold, some} from "fp-ts/lib/Option";

describe('option', () =>{

    it('should fold', () => {
        let value = some("AA");

        expect(fold(() => "Not present", (it) => it)(value)).toEqual("AA")
    });

});