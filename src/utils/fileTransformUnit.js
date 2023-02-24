module.exports = originalSize => {
	// 将字节单位转化为MB或者kb
	let fileSize =
		originalSize.size / 1024 > 1024
			? (originalSize.size / 1024 / 1024).toFixed(2) + 'MB'
			: (originalSize.size / 1024).toFixed(2) + 'kb';

	return fileSize;
};
