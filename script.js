let data = [
    {
        "title": "Work",
        "timeframes": {
          "daily": {
            "current": 5,
            "previous": 7
          },
          "weekly": {
            "current": 32,
            "previous": 36
          },
          "monthly": {
            "current": 103,
            "previous": 128
          }
        }
      },
      {
        "title": "Play",
        "timeframes": {
          "daily": {
            "current": 1,
            "previous": 2
          },
          "weekly": {
            "current": 10,
            "previous": 8
          },
          "monthly": {
            "current": 23,
            "previous": 29
          }
        }
      },
      {
        "title": "Study",
        "timeframes": {
          "daily": {
            "current": 0,
            "previous": 1
          },
          "weekly": {
            "current": 4,
            "previous": 7
          },
          "monthly": {
            "current": 13,
            "previous": 19
          }
        }
      },
      {
        "title": "Exercise",
        "timeframes": {
          "daily": {
            "current": 1,
            "previous": 1
          },
          "weekly": {
            "current": 4,
            "previous": 5
          },
          "monthly": {
            "current": 11,
            "previous": 18
          }
        }
      },
      {
        "title": "Social",
        "timeframes": {
          "daily": {
            "current": 1,
            "previous": 3
          },
          "weekly": {
            "current": 5,
            "previous": 10
          },
          "monthly": {
            "current": 21,
            "previous": 23
          }
        }
      },
      {
        "title": "Self Care",
        "timeframes": {
          "daily": {
            "current": 0,
            "previous": 1
          },
          "weekly": {
            "current": 2,
            "previous": 2
          },
          "monthly": {
            "current": 7,
            "previous": 11
          }
        }
      }
]

const buttons = document.querySelectorAll('.activity-tracker__option')

const listenToButtons = (array) => {
    array.forEach(button => {
        button.addEventListener('click', () => {
            activateClickedButton(button)
            const clickedOption = button.dataset.option
            renderCards(clickedOption)
        })
    })
};

const activateClickedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'))
    button.classList.add('active')
}

const loadData = async () => {
    // Fetch data
    const response = await fetch('./data.json')
    const fetchedData = await response.json()
    data = fetchedData
    buttons[1].click()
}

const clearActivities = () => {
    //Limpiar actividades del HTML
    const activities = document.querySelectorAll('.activity-tracker__activity')
    activities.forEach(a => a.remove())
}

const renderCards = async (clickedOption) => {
    clearActivities()
    const activityTracker = document.querySelector('section.activity-tracker')

    const calcTimeframe = (option) => {
        if (option === 'daily') {
            return 'Yesterday'
        } else if (option === 'weekly') {
            return 'Last Week'
        } else if (option === 'monthly') {
            return 'Last Month'
        }
    }
    
    data.forEach(activity => {
        const name = activity.title
        const activityClass = name.toLowerCase().replace(' ', '-')
        const timeframeData = activity.timeframes[clickedOption]
        const previousTimeframe = calcTimeframe(clickedOption)
        const section = document.createElement('section')
        section.classList.add('activity-tracker__activity', activityClass)
        const stringToInject = `
        <div class="activity__bg">
            <img src="./images/icon-${activityClass}.svg" alt="">
        </div>
        <div class="activity__info">
         <header class="activity__header">
          <h2 class="activity__name">
            ${name}
          </h2>
          <div class="activity__options">
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF" fill-rule="evenodd" />
            </svg>
           </div>
         </header>
        <div class="activity__timeframes">
          <h3 class="activity__current-timeframe">
            ${timeframeData.current}hrs
          </h3>
          <div class="activity__previous-timeframe">
            <p class="time-window">${previousTimeframe}</p>
            <p> - </p>
            <p class="time">${timeframeData.previous}hrs</p>
          </div>
         </div>
        </div>
        `
        section.innerHTML = stringToInject
        activityTracker.append(section)
    })
};

listenToButtons(buttons)
loadData()