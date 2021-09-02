const baseApi = 'http://188.166.66.53:3001/'

export function getImageUrl(url: string) {

  // console.log(baseApi + 'static/' + url);
  // debugger;
  return baseApi + 'static/' + url;
}
