import { Point, IViewer } from './types';

/**
 * 小方块类  逻辑坐标
 */
export class Square {
    private _point: Point = {
        x: 0,
        y: 0
    }
    private _color: string = ''

    // 属性：显示者
    private _viewer?: IViewer

    public get viewer() {
        return this._viewer
    }

    public set viewer(val) {
        this._viewer = val
        if (val) {
            val.show()
        }
    }
    public get point() {
        return this._point
    }

    public set point(val) {
        this._point = val;
        // 完成显示
        if (this.viewer) {
            this.viewer.show();
        }
    }

    public get color() {
        return this._color
    }

    public set color(val) {
        this._color = val
    }
}