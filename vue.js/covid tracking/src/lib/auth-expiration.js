import { SessionStorage } from 'quasar'
import { date } from 'quasar'


function putWithExpiry(key, value, expiry) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
        expiry: expiry
    }

    SessionStorage.set(key, JSON.stringify(item))
 }

function setWithExpiry(key, value) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
        expiry: new Date(now.getTime() + 20*60000)
        //expiry: new Date(now.getTime() + 1*60000)
    }

    const expiry = new Date(item.expiry)
    SessionStorage.set(key, JSON.stringify(item))
   
    //------------------------
    //const result = date.formatDate(now, 'ddd, MMM D, YYYY h:mm A')
    //console.log('setWithExpiry: Now',  result)
    //const result2 = date.formatDate(expiry, 'ddd, MMM D, YYYY h:mm A')
    //console.log('setWithExpire: Expering time',  result2)
    //---------------------------
}

function getWithExpiry(key) {
    const itemStr = SessionStorage.getItem(key)
    // if the item doesn't exist, return null
    
    if (!itemStr) {
		return false
	}
	const item = JSON.parse(itemStr)
    const now = new Date()
    const expiry = new Date(item.expiry)

    // compare the expiry time of the item with the current time
    
    //---------------------------------------
    //const result = date.formatDate(now, 'ddd, MMM D, YYYY h:mm A')
    //console.log('getWithExpiry: Now',  result)
    //const result2 = date.formatDate(expiry, 'ddd, MMM D, YYYY h:mm A')
    //console.log('getWithExpire: Expering time',  result2)

    //----------------

	if (now.getTime() > expiry.getTime()) {
        // If the item is expired, delete the item from storage
        putWithExpiry(key,false,item.expiry)
		return false
	}else {
        if (item.value == true) {
            setWithExpiry(key, item.value) 
        }
    }
	return item.value
}



export { getWithExpiry }
export { setWithExpiry }

