function getCentroid(coordinates) {
  var xSum = 0
  var ySum = 0

  const numPoints = coordinates.length

  coordinates.forEach((point) => {
    xSum += point.lat
    ySum += point.lng
  })

  return {lat: xSum / numPoints, lng: ySum / numPoints}
}

export default getCentroid
