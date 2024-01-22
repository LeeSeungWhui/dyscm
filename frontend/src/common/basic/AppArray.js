export class AppArray {
    // [
    //     ['key1', { title: "Title 1", description: "Description 1" }],
    //     ['key2', { title: "Title 2", description: "Description 2" }],
    //     // 추가 데이터 항목...
    // ];
    constructor(data = []) {
        this.data = data;
    }

    // JSON으로 변환 (특정 속성 포함)
    toJSON(attr = null) {
        if (attr === null) {
            return this.data;
        } else {
            const obj = this.data.reduce((acc, [key, value]) => {
                acc[key] = value[attr];
                return acc;
            }, {});
            return obj;
        }
    }

    // JSON에서 변환
    static fromJSON(json) {
        return new AppArray(JSON.parse(json));
    }

    // 배열로 변환
    toArray() {
        return this.data.slice();
    }

    // 배열에서 변환
    static fromArray(array) {
        return new AppArray(array);
    }

    // JSON 객체 배열에서 AppArray 인스턴스 생성
    static fromJsonArray(jsonArray) {
        const arrayData = jsonArray.map((item, index) => [index.toString(), item]);
        return new AppArray(arrayData);
    }

    // filter 메소드
    filter(callback) {
        return new AppArray(this.data.filter(callback));
    }

    // 저장된 요소의 개수 반환
    length() {
        return this.data.length;
    }

    // map 메소드
    map(callback) {
        return new AppArray(this.data.map(callback));
    }

    // find 메소드
    find(callback) {
        return this.data.find(callback);
    }

    // 주어진 인덱스의 요소 반환
    getAt(index) {
        return index >= 0 && index < this.data.length ? this.data[index] : undefined;
    }

    // 주어진 인덱스의 요소 설정 (불변성 유지)
    setAt(index, key, value) {
        if (index >= 0 && index < this.data.length) {
            const newData = [...this.data];
            newData[index] = [key, value];
            return new AppArray(newData);
        }

        return this; // 인덱스가 범위를 벗어나면 변경 없음
    }

    // 특정 키를 가진 데이터 반환
    get(key) {
        const item = this.data.find(item => item[0] === key);
        return item ? item[1] : undefined;
    }

    // 특정 키를 가진 데이터 업데이트 또는 추가 (불변성 유지)
    set(key, newValue) {
        const index = this.data.findIndex(item => item[0] === key);
        const newData = [...this.data];

        if (index !== -1) {
            newData[index] = [key, newValue];
        } else {
            newData.push([key, newValue]);
        }

        return new AppArray(newData);
    }

    // 특정 값의 속성을 기반으로 필터링
    filterByAttr(attr, val) {
        return new AppArray(this.data.filter(item => item[1][attr] === val));
    }

    // 모든 키를 배열로 반환
    getKeyList() {
        return this.data.map(item => item[0]);
    }

    // 모든 값을 배열로 반환
    getAttrList() {
        return this.data.map(item => item[1]);
    }

    // 각 요소에 대해 주어진 함수 실행
    forEach(callback) {
        this.data.forEach((item, index) => {
            callback(index, item[0], item[1]);
        });
    }

    // 각 키, 값 에 대해 주어진 함수 실행
    forEachByKey(callback) {
        this.data.forEach((item) => {
            callback(item[0], item[1]);
        });
    }

    // 이터레이터 메소드를 추가
    *[Symbol.iterator]() {
        for (const item of this.data) {
            yield item;
        }
    }

    // entries() 메소드 추가
    entries() {
        return this[Symbol.iterator]();
    }

    // 추가 메소드 구현...
}
