Bottom sheet component for React Native.

# Props

visible: Boolean
Bottom sheet visibility

height: Number
To control the height of the bottom sheet when visible.

onVisibilityChange: Function
Callback to show/ hide the visibility of the bottom sheet.

# Example
```
state = {
  visibility: true
}

const handleVisibility = (visibility) => {
  this.setState({ 
    visibility
  })
}

render() {
  return (
  <View>
    <CustomBottomSheet
      visible={this.state.visibility}
      onVisibilityChange={this.handleVisibility}
      height={100}
      />
  </View>
  )
}
```
