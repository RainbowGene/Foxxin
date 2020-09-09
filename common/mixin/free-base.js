// 混入
import $Time from "../js/time.js"

export default {
	filters: {
		formatTime(time) {
			return $Time.gettime(time)
		}
	}
}
