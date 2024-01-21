export class AppMap {
    constructor(initialData = []) {
        this.data = new Map(initialData);
        this.order = initialData.map(item => item[0]);
        return AppMap.createProxy(this);  // 생성자에서 프록시 적용
    }

    set(key, value) {
        if (!this.data.has(key)) {
            this.order.push(key);
        }
        const newData = new Map(this.data);
        newData.set(key, value);
        return new AppMap(Array.from(newData.entries()));
    }

    get(key) {
        return this.data.get(key);
    }

    toJSON() {
        return Array.from(this.data.entries()).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    }

    toJSON(attrInValue) {
        return Array.from(this.data.entries()).reduce((obj, [key, value]) => {
            obj[key] = value[attrInValue];
            return obj;
        }, {});
    }

    static fromJsonArray(jsonObject) {
        // 배열의 각 요소를 Map의 키-값 쌍으로 변환
        const initialData = jsonObject.map((item, index) => [index.toString(), item]);

        // AppMap 인스턴스 생성
        return new AppMap(initialData);
    }

    static fromJson(jsonObject) {
        return new AppMap(Object.entries(jsonObject));
    }

    // []연산자 사용
    static createProxy(AppMapInstance) {
        return new Proxy(AppMapInstance, {
            get(target, key) {
                if (target.data.has(key)) {
                    return target.data.get(key);
                }
                return target[key];
            },
            set(target, key, value) {
                target.set(key, value);
                return true; // 성공적으로 설정되었음을 나타냄
            }
        });
    }

    // 이터레이터 메소드 구현
    [Symbol.iterator]() {
        return this.data.entries();
    }

    // forEach 메소드 구현
    forEach(callback) {
        this.data.forEach((value, key) => {
            callback(value, key, this);
        });
    }

    // find메소드구현
    find(callback) {
        for (const [key, value] of this.data) {
            if (callback(value, key, this)) {
                return value;
            }
        }
        return undefined; // 조건을 만족하는 요소가 없을 경우 undefined 반환
    }

    // filter메소드 구현
    filter(callback) {
        const filteredData = Array.from(this.data).filter(([key, value]) => callback(value, key, this));
        return new AppMap(filteredData);
    }

    // map 메소드 구현
    map(callback) {
        const mappedData = Array.from(this.data).map(([key, value]) => {
            const newValue = callback(value, key, this);
            return [key, newValue];
        });
        return new AppMap(mappedData);
    }

    // entries 메소드 구현
    entries() {
        return this.data.entries();
    }

    // 추가 필요한 메소드 구현
}