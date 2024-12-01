export function main(args: {}): {} {
    let name: string = args['name'] || 'strangerz again'
    let greeting: string = 'Hello ' + name + '!'
    console.log(greeting)
    return { body: greeting }
}

export function foo() {
    return 'bar';
}
