function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  // YOUR CODE
  let buttonAll = document.querySelector('#all-filter')
  buttonAll.addEventListener('click', async function(event){
    event.preventDefault()
    //console.log('all button was clicked')

    let response = await fetch('https://kiei451.com/api/rides.json')
    let rides = await response.json()
    //console.log(ride)

    buttonAll.insertAdjacentHTML('beforeend', renderRides(rides))
     
  })

  let buttonNooberPurple = document.querySelector('#noober-purple-filter')
  buttonNooberPurple.addEventListener('click', async function(event){
    event.preventDefault()
    //console.log('noober purple check')

    let response = await fetch('https://kiei451.com/api/rides.json')
    let rides = await response.json()
    //console.log(ride)

    let nooberPurpleArray = []
    for (let i = 0; i < rides.length; i++){
      let service = levelOfService(rides[i])
      //console.log(service)
      if (service == 'Noober Purple'){
        nooberPurpleArray.push(rides[i])
      }
    }
      //console.log(nooberPurpleArray)
      buttonNooberPurple.insertAdjacentHTML('beforeend', renderRides(nooberPurpleArray))
    
  })

  let buttonNooberPool = document.querySelector('#noober-pool-filter')
  buttonNooberPool.addEventListener('click', async function(event){
    event.preventDefault()
    //console.log('noober pool check')
    let response = await fetch('https://kiei451.com/api/rides.json')
    let rides = await response.json()

    let nooberPoolArray = []
    for (let i = 0; i < rides.length; i++){
      let service = levelOfService(rides[i])
      if (service == 'Noober Pool'){
        nooberPoolArray.push(rides[i])
      }
    }
    buttonNooberPool.insertAdjacentHTML('beforeend', renderRides(nooberPoolArray))
  
  })

  let buttonNooberXL = document.querySelector('#noober-xl-filter')
  buttonNooberXL.addEventListener('click', async function(event){
    event.preventDefault()
    //console.log('noober XL check')
    let response = await fetch('https://kiei451.com/api/rides.json')
    let rides = await response.json()

    let nooberXLArray = []
    for (let i = 0; i < rides.length; i++){
      let service = levelOfService(rides[i])
      if (service == 'Noober XL'){
        nooberXLArray.push(rides[i])
      }
    }
    buttonNooberPool.insertAdjacentHTML('beforeend', renderRides(nooberXLArray))

  })

  let buttonNooberX = document.querySelector('#noober-x-filter')
  buttonNooberX.addEventListener('click', async function(event){
    event.preventDefault()
    //console.log('noober X check')
    let response = await fetch('https://kiei451.com/api/rides.json')
    let rides = await response.json()

    let nooberXArray = []
    for (let i = 0; i < rides.length; i++){
      let service = levelOfService(rides[i])
      if (service == 'Noober X'){
        nooberXArray.push(rides[i])
      }
    }
    buttonNooberPool.insertAdjacentHTML('beforeend', renderRides(nooberXArray))

  })

})
