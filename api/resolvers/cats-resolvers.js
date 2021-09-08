import { getActionFromState } from '@react-navigation/native'
import CatModel from '../models/cats.js'

async function createCat(args) {
    try {
        const { name, file, address } = args.cat
        const cat = new CatModel({ name, url: file, coordinates: { longitude: address, latitude: address }, createdAt: Date.now() })

        const newCat = await cat.save()

        return newCat
    } catch (error) {
        throw error;
    }
}

async function getCats(args) {
    try{
        const catsList = await CatModel.find().sort({field: 'desc', createdAt: -1})
        if (args) {
            catsList.limit(args)
            return catsList;
        } else {
            return catsList
        }
    } catch (error) {
        throw error;
    }
}



export { createCat, getCats }