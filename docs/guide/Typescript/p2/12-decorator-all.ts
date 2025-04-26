import 'reflect-metadata';


// decorator property 获取类型信息
// 类声明的时候加载执行
(function () {
    console.log("00000000000");
    function Prop(): PropertyDecorator {
        return (target, key: string) => {
            const type = Reflect.getMetadata('design:type', target, key);
            console.log(`${key} type: ${type.name}`);
        };
    }
    function ClassMeta(): ClassDecorator {
        return (target: Function) => {
            target.prototype.name = "SomeClass";
            const type = Reflect.getMetadata('design:type', target);
            console.log(type);//undefined 因为Reflect.getMetadata('design:type', target) 只能获取到类的构造函数，而不能获取到类本身的信息。如果要获取类本身的元数据信息，可以使用 Reflect.defineMetadata() 方法。
            Reflect.defineMetadata('classMetaData', target.name, target);
            // const type = Reflect.getMetadata('design:class', target);
            // console.log(`ClassMeta type: ${type.name}`);
            // other...
        };
    }
    @ClassMeta()
    class SomeClass {
        @Prop()
        public Aprop!: string;
        @Prop()
        public name: string;
    }
    console.log(Reflect.getMetadata('classMetaData', SomeClass));// SomeClass
})();

// decorator 定义元数据, 获取元数据 编程方式
// decorator method 获取类型信息
(function () {
    console.log("111111111111111111");
    function classDecorator(): ClassDecorator {
        return (target) => {
            console.log(`${target.name} is decorated`);
            // 在类上定义元数据，key 为 `classMetaData`，value 为 `valueClass`
            Reflect.defineMetadata('classMetaData', 'valueClass', target);
        };
    }

    function methodDecorator(): MethodDecorator {
        return (target, key: string, descriptor: PropertyDescriptor) => {
            // target : Constructor<SomeClass>
            // key : "someMethod"
            // descriptor : { value: () => void }
            console.log(`${key} is decorated`);
            // 在方法上定义元数据，key 为 `methodMetaData`，value 为 `valueMethod`
            // Reflect.defineMetadata('methodMetaData', 'valueMethod', descriptor.value);
            // key : 'someMethod' 
            // descriptor.value : f  someMethod() {...} 是一个函数
            Reflect.defineMetadata('methodMetaData', 'valueMethod', descriptor.value);
            Reflect.defineMetadata('methodMetaDataKey', 'valueMethodKey', target, key);
        };
    }

    @classDecorator()
    class SomeClass {

        @methodDecorator()
        public someMethod() {
            console.log('someMethod is called');
        }

    }

    // 调用 
    const classVal = Reflect.getMetadata('classMetaData', SomeClass); // valueClass
    console.log('classVal:' + classVal);

    const methodVal = Reflect.getMetadata('methodMetaData', SomeClass.prototype.someMethod); // valueMethod
    console.log('methodVal:' + methodVal);

    const methodVal2 = Reflect.getMetadata('methodMetaDataKey', SomeClass.prototype, 'someMethod'); // valueMethod2
    console.log('methodVal2:' + methodVal2);
    const methodVal3 = Reflect.getMetadata('methodMetaDataKey', new SomeClass(), 'someMethod'); // valueMethod2
    console.log('methodVal3:' + methodVal3);


})();

// decorator parameter 获取类型信息
// decorator 注解方式定义元数据，获取元数据
(function () {
    /**
function metadata(
    metadataKey: any,
    metadataValue: any
): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
     */

    console.log("=================@Reflect.metadata")
    @Reflect.metadata("Test:key", "Test:value")
    class Test {

        @Reflect.metadata("h:key", "h:value")
        public h(): string {
            return "h";
        }
    }
    const testAgent = Reflect.getMetadata("Test:key", Test);
    console.log(Reflect.getMetadata("Test:key", Test)); // Test:value
    console.log(Reflect.getMetadata("h:key", Test.prototype, "h")); // h:value

})();

// IOC, DI
(function () {

    console.log("=================ioc")
    type Constructor<T = any> = new (...args: any[]) => T;
    const Injectable = (): ClassDecorator => target => { };

    class OtherService {
        a = 1;
    }

    @Injectable()
    class TestService {

        constructor(public readonly otherService: OtherService) { }

        testMethod() {
            console.log(this.otherService.a);
        }
    }

    const Factory = <T>(target: Constructor<T>): T => {
        // 获取所有注入的服务
        const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
        const args = providers.map((provider: Constructor) => new provider());
        return new target(...args);
    };

    Factory(TestService).testMethod(); // 1
})();


(function () {
    console.log("=================restful api")

    // 用装饰器去定义 元数据
    const METHOD_METADATA = 'method';
    const PATH_METADATA = 'path';

    const Controller = (path: string): ClassDecorator => {
        return target => {
            Reflect.defineMetadata(PATH_METADATA, path, target);
        }
    }

    const createMappingDecorator = (method: string) => {
        return (path: string): MethodDecorator => {
            return (target, key, descriptor) => {
                Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
                Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
            }
        }
    }

    const Get = createMappingDecorator('GET');
    const Post = createMappingDecorator('POST');

    // 元数据 的解析实现
    function isConstructor(fn: any): fn is FunctionConstructor {
        return typeof fn === 'function' && /^class\s/.test(Function.prototype.toString.call(fn));
    }
    function isFunction(value: any): value is Function {
        return typeof value === 'function';
    }

    function mapRoute(instance: Object) {
        const prototype = Object.getPrototypeOf(instance);

        // 筛选出类的 methodName
        const methodsNames: string[] = Object.getOwnPropertyNames(prototype)
            .filter(item => !isConstructor(item) && isFunction(prototype[item]));
        return methodsNames.map(methodName => {
            const fn = prototype[methodName];

            // 取出定义的 metadata
            const route = Reflect.getMetadata(PATH_METADATA, fn);
            const method = Reflect.getMetadata(METHOD_METADATA, fn);
            return {
                route,
                method,
                fn,
                methodName
            }
        })
    };

    @Controller('/test')
    class SomeClass {
        @Get('/a')
        someGetMethod() {
            return 'hello world';
        }

        @Post('/b')
        somePostMethod() { }
    }
    Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'

    console.log(mapRoute(new SomeClass()));
})();