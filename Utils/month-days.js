const getMonthDays = (year, month) => {
    const days = []
    const date = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    for (let i = 1; i <= daysInMonth; i++) {
        date.setDate(i)
        days.push({ day: i, dayOfWeek: daysInWeek[date.getDay()] })
    }
    return days
}

module.exports = getMonthDays