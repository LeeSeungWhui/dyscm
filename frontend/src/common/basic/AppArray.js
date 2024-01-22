export class AppArray {
    // [
    //     ['key1', { title: "Title 1", description: "Description 1" }],
    //     ['key2', { title: "Title 2", description: "Description 2" }],
    //     // 추가 데이터 항목...
    // ];
    constructor(data = []) {
        this.data = data;
    }

    // JSON으로 변환
    toJSON() {
        return JSON.stringify(this.data);
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

    // 조건에 맞는 모든 요소 찾기
    findAll(callback) {
        return this.data.filter(callback);
    }

    // 주어진 인덱스의 요소 반환
    getAt(index) {
        return index >= 0 && index < this.data.length ? this.data[index] : undefined;
    }

    // 주어진 인덱스의 요소 설정
    setAt(index, key, value) {
        if (index >= 0 && index < this.data.length) {
            this.data[index] = [key, value];
        }
    }

    // 특정 키를 가진 데이터 반환
    get(key) {
        const item = this.data.find(item => item[0] === key);
        return item ? item[1] : undefined;
    }

    // 특정 키를 가진 데이터 업데이트 또는 추가
    set(key, newValue) {
        const index = this.data.findIndex(item => item[0] === key);
        if (index !== -1) {
            // 기존 키가 있으면 해당 값 업데이트
            this.data[index][1] = newValue;
        } else {
            // 새 키-값 쌍 추가
            this.data.push([key, newValue]);
        }
    }

    // 특정 키를 기반으로 필터링
    filterByKey(key) {
        return new AppArray(this.data.filter(item => item[0] === key));
    }

    // 특정 값의 속성을 기반으로 필터링
    filterByValue(property, value) {
        return new AppArray(this.data.filter(item => item[1][property] === value));
    }

    // 모든 키를 배열로 반환
    getKeyList() {
        return this.data.map(item => item[0]);
    }

    // 모든 값을 배열로 반환
    getValueList() {
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

    // 추가 메소드 구현...
}
