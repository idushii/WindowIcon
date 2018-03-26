export default {
  computed: {
    pointsGlass() {
      let frame = this.window.type == 'active' ? this.propsSVG.frame.width : this.propsSVG.frame.widthStatic
      let glass = { x: frame, y: frame, width: this.window.w - frame*2, height: this.window.h - frame*2 }

      let points = []

      points.push([ frame, frame ])
      points.push([ this.window.w - frame, frame ])
      points.push([ this.window.w - frame, this.window.h - frame ])
      points.push([ frame, this.window.h - frame ])

      return { glass, border: points.map( p => `${p[0]} ${p[1]}` ).join(', ') }
    },
    pointsOpen() {
      let width = this.propsSVG.line.width;
      let frame = this.propsSVG.frame.width*1;
      let k = 0.5
      let points = []
      if (this.window.open == 'left') {
        points.push([frame + width/2, frame + width/2])
        points.push([this.window.w - frame, this.window.h / 2])
        points.push([frame + width/2, this.window.h - width/2 - frame])
      }
      if (this.window.open == 'right') {
        points.push([this.window.w - width*k - frame, width*k + frame])
        points.push([frame, this.window.h / 2])
        points.push([this.window.w - width*k - frame, this.window.h - width*k - frame])
      }

      return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
    },
    pointsLeaf() { // Форточка
      let points = []
      let frame = this.propsSVG.frame.width;

      points.push([frame, this.window.h-frame])
      points.push([this.window.w/2, frame])
      points.push([this.window.w - frame, this.window.h - frame])

      return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
    },
    pointsFrame() {
      let points = [];
      let frame = this.window.type == 'active' ? this.propsSVG.frame.width : this.propsSVG.frame.widthStatic
      let width = this.propsSVG.line.width
      let {w, h} = {...this.window}

      points.push([width/2, width/2])
      points.push([frame, frame])
      points.push([frame, h - frame])
      points.push([width/2, h])
      points.push([width/2, width/2])

      points.push([width/2, width/2])
      points.push([frame, frame])
      points.push([w - frame, frame])
      points.push([w, width/2])
      points.push([width/2, width/2])

      points.push([w, width/2])
      points.push([w - frame, frame])
      points.push([w - frame, h - frame])
      points.push([w, h])
      points.push([w - width/2, width/2])

      points.push([w, h])
      points.push([width/2, h - width/2])
      points.push([frame, h - frame])
      points.push([w-frame, h - frame])
      
      return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
    },
    positionPen() {
      let frame = this.propsSVG.frame.width
      let {w, h} = {...this.window}
      console.log(window.pen)
      return { x: this.window.open == 'left' ?  w - frame * 0.85 : frame*0.15, y: (h/2) - (frame * 3 / 2) }
    }
  }
}