const baseApi = 'http://192.168.31.15:3001/'

export function getImageUrl(url: string) {

  // console.log(baseApi + 'static/' + url);
  // debugger;
  if (!url) {
    url = '';
  }
  // console.log('URL', url)
  return baseApi + 'static/' + url;
}
