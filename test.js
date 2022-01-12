function sum(a,b,c,d){
    return a+b+c+d
}
function memoize(arbitraryFunction){
    const cacheFn = sum;
    const inputOutputMap = {};
    return function memoizedSum(){
        let deeperMap = null
        const argumentsLength = arguments.length
        let result = null;
        arguments.forEach((argument, index)=>{
            if(argumentsLength===index){
                if(deeperMap) {
                    if (deeperMap[argument]) {
                        result = deeperMap[argument]
                    } else if () {

                    } else {
                        if (deeperMap) {
                            deeperMap[argument] = cacheFn(...arguments)
                        } else {
                            inputOutputMap[argument] = cacheFn(...arguments)
                        }
                    }
                }
            } else {
                if(deeperMap){
                    if(deeperMap[argument])
                }
            }

                if(deeperMap[argument]) {

                }
            }
            if(inputOutputMap[argument]){
                if(argumentsLength===index){
                    inputOutputMap[argument] = cacheFn(...arguments)
                } else {
                    if(inputOutputMap[argument]) {
                        deeperMap = inputOutputMap[argument];
                    } else {
                        deeperMap
                    }
                }
            }
        })


        if(inputOutputMap[a]){
            if(inputOutputMap[a][b]){
                return inputOutputMap[a][b]
            } else {
                inputOutputMap[a][b] = cacheFn(a,b);
            }
        } else {
            inputOutputMap[a] = {}
            inputOutputMap[a][b]= cacheFn(a,b)
        }
        return inputOutputMap[a][b];
    }
}
const memoizedFn = memoize(sum);
memoizedFn(1,2);
memoizedFn(3,5);
//11
