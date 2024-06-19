import books from "./../resources/data.mjs"

const getAll = ()=>{
    
    return books
}

const saveBook = (parent,args,contextValue,info)=>{
    books.push(args)

    return books[books.length - 1]
}

const findById = (parent, args,contextValue, info)=>{
    const id = args.id

    return books.find( book => book.id === id)
}

export{
    getAll,
    findById,
    saveBook
}