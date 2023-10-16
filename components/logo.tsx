import clsx from 'clsx';

export default function Logo(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 455 444"
      fill="#CFFFFF"
      {...props}
      className={clsx('fill-blue-400 dark:fill-blue-200', props.className)}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.856 113.024C26.5067 113.024 17.4187 110.891 10.592 106.624C3.76533 102.272 0.352 95.6587 0.352 86.784C0.352 82.0907 1.16267 78.5067 2.784 76.032C4.40533 73.5573 6.79467 72.32 9.952 72.32C12.256 72.32 14.1333 72.9173 15.584 74.112C17.0347 75.3067 17.76 76.8427 17.76 78.72C17.76 80.4267 17.632 81.92 17.376 83.2C17.376 83.5413 17.2907 84.1387 17.12 84.992C17.0347 85.8453 16.992 86.7413 16.992 87.68C16.992 91.52 18.912 94.3787 22.752 96.256C26.6773 98.1333 32.1387 99.072 39.136 99.072C46.3893 99.072 52.064 97.792 56.16 95.232C60.256 92.5867 62.304 88.9173 62.304 84.224C62.304 81.3227 61.3653 78.848 59.488 76.8C57.6107 74.6667 55.264 72.9173 52.448 71.552C49.632 70.1013 45.664 68.352 40.544 66.304C33.9733 63.744 28.5973 61.312 24.416 59.008C20.32 56.704 16.7787 53.5893 13.792 49.664C10.8907 45.6533 9.44 40.704 9.44 34.816C9.44 28.672 11.0613 23.2107 14.304 18.432C17.632 13.6533 22.368 9.94133 28.512 7.296C34.7413 4.65066 42.0373 3.328 50.4 3.328C56.6293 3.328 62.3467 4.26666 67.552 6.144C72.7573 7.93599 76.896 10.7093 79.968 14.464C83.1253 18.2187 84.704 22.8267 84.704 28.288C84.704 33.664 83.8933 37.7173 82.272 40.448C80.6507 43.1787 78.2613 44.544 75.104 44.544C72.8853 44.544 71.008 43.8613 69.472 42.496C68.0213 41.1307 67.296 39.5093 67.296 37.632C67.296 36.0107 67.424 34.5173 67.68 33.152C67.936 30.592 68.064 28.9707 68.064 28.288C68.064 24.704 66.3147 21.9733 62.816 20.096C59.3173 18.2187 54.9653 17.28 49.76 17.28C42.4213 17.28 36.7893 18.6453 32.864 21.376C29.024 24.0213 27.104 27.776 27.104 32.64C27.104 35.8827 28.0853 38.656 30.048 40.96C32.096 43.264 34.6133 45.184 37.6 46.72C40.5867 48.256 44.768 50.0907 50.144 52.224C56.6293 54.8693 61.8347 57.2587 65.76 59.392C69.6853 61.5253 73.0133 64.4267 75.744 68.096C78.56 71.7653 79.968 76.288 79.968 81.664C79.968 91.7333 76.128 99.4987 68.448 104.96C60.8533 110.336 50.656 113.024 37.856 113.024ZM142.966 72.448C139.971 78.1956 138.396 84.2887 138.242 90.7274C136.446 92.5454 134.796 94.047 133.292 95.232C130.476 97.4507 127.233 98.56 123.564 98.56C119.041 98.56 115.713 96.768 113.58 93.184C111.532 89.6 110.508 83.3707 110.508 74.496C110.508 72.1067 110.593 68.7787 110.764 64.512H126.38C136.023 64.512 140.844 61.568 140.844 55.68C140.844 54.0587 140.545 52.9493 139.948 52.352C139.351 51.7547 138.369 51.456 137.004 51.456H122.668C133.761 41.6427 139.308 30.1227 139.308 16.896C139.308 12.1173 138.284 8.14933 136.236 4.992C134.188 1.83466 131.372 0.255997 127.788 0.255997C122.924 0.255997 118.359 2.55999 114.092 7.16799C109.911 11.776 106.327 17.9627 103.34 25.728C100.353 33.4933 98.1347 42.0693 96.684 51.456H89.388C85.548 51.456 83.628 53.8453 83.628 58.624C83.628 60.672 84.0547 62.1653 84.908 63.104C85.8467 64.0427 87.596 64.512 90.156 64.512H95.148C94.892 68.352 94.764 72.1493 94.764 75.904C94.764 100.395 103.468 112.64 120.876 112.64C126.508 112.64 131.5 111.189 135.852 108.288C137.674 107.074 139.436 105.717 141.138 104.219C141.673 105.162 142.283 106.049 142.966 106.88C146.123 110.72 150.347 112.64 155.638 112.64C162.379 112.64 167.969 109.056 172.406 101.888C173.601 105.216 175.35 107.861 177.654 109.824C180.043 111.701 182.646 112.64 185.462 112.64C189.131 112.64 192.929 111.147 196.854 108.16C200.779 105.173 204.491 101.504 207.99 97.152C208.035 97.1001 208.079 97.0477 208.123 96.9946C208.161 96.9476 208.199 96.9002 208.237 96.8523C212.168 107.377 219.839 112.64 231.251 112.64C236.883 112.64 241.875 111.189 246.227 108.288C248.618 106.694 250.906 104.855 253.091 102.772C253.711 103.675 254.391 104.533 255.133 105.344C259.656 110.208 266.013 112.64 274.205 112.64C279.581 112.64 284.189 111.616 288.029 109.568C291.954 107.52 295.112 104.661 297.501 100.992C298.952 98.7733 299.677 96.128 299.677 93.056C299.677 91.264 299.336 89.856 298.653 88.832C298.056 87.808 297.202 87.296 296.093 87.296C294.813 87.296 293.661 87.936 292.637 89.216C289.65 93.056 287.005 95.7867 284.701 97.408C282.482 99.0293 279.624 99.84 276.125 99.84C271.261 99.84 267.805 97.8773 265.757 93.952C275.912 91.4773 283.08 88.1493 287.261 83.968C291.528 79.7013 293.661 74.624 293.661 68.736C293.661 63.7013 292.168 59.7333 289.181 56.832C286.194 53.8453 282.226 52.352 277.277 52.352C271.73 52.352 266.738 53.8453 262.301 56.832C257.949 59.8187 254.536 63.872 252.061 68.992C249.586 74.0267 248.349 79.488 248.349 85.376C248.349 87.222 248.459 88.9848 248.68 90.6645C246.859 92.5108 245.188 94.0333 243.667 95.232C240.851 97.4507 237.608 98.56 233.939 98.56C229.416 98.56 226.088 96.768 223.955 93.184C221.907 89.6 220.883 83.3707 220.883 74.496C220.883 72.1067 220.968 68.7787 221.139 64.512H236.755C246.398 64.512 251.219 61.568 251.219 55.68C251.219 54.0587 250.92 52.9493 250.323 52.352C249.726 51.7547 248.744 51.456 247.379 51.456H233.043C244.136 41.6427 249.683 30.1227 249.683 16.896C249.683 12.1173 248.659 8.14933 246.611 4.992C244.563 1.83466 241.747 0.255997 238.163 0.255997C233.299 0.255997 228.734 2.55999 224.467 7.16799C220.286 11.776 216.702 17.9627 213.715 25.728C210.728 33.4933 208.51 42.0693 207.059 51.456H199.763C195.923 51.456 194.003 53.8453 194.003 58.624C194.003 60.672 194.43 62.1653 195.283 63.104C196.222 64.0427 197.971 64.512 200.531 64.512H205.523C205.267 68.352 205.139 72.1493 205.139 75.904C205.139 78.658 205.249 81.2572 205.469 83.7015C204.723 83.9801 204.027 84.4955 203.382 85.248C199.457 89.9413 196.342 93.3547 194.038 95.488C191.734 97.536 189.771 98.56 188.15 98.56C187.126 98.56 186.273 98.176 185.59 97.408C184.993 96.64 184.694 95.616 184.694 94.336C184.694 90.496 185.675 83.6693 187.638 73.856C188.918 67.1147 189.558 62.848 189.558 61.056C189.558 58.0693 187.467 56.576 183.286 56.576C181.323 56.576 179.446 56.7467 177.654 57.088C177.227 55.2107 176.673 53.9307 175.99 53.248C175.393 52.48 174.155 52.096 172.278 52.096C166.39 52.096 160.801 53.9733 155.51 57.728C150.305 61.3973 146.123 66.304 142.966 72.448ZM124.332 12.544C123.052 12.544 121.601 14.1653 119.98 17.408C118.444 20.5653 116.951 25.0027 115.5 30.72C114.135 36.352 112.983 42.624 112.044 49.536C117.079 45.184 120.833 40.32 123.308 34.944C125.868 29.4827 127.148 24.5333 127.148 20.096C127.148 15.0613 126.209 12.544 124.332 12.544ZM160.246 99.712C162.123 99.712 163.915 98.6027 165.622 96.384C167.329 94.1653 168.566 91.2213 169.334 87.552L174.07 64C170.486 64.0853 167.158 65.4507 164.086 68.096C161.099 70.656 158.71 74.0693 156.918 78.336C155.126 82.6027 154.23 87.1253 154.23 91.904C154.23 94.5493 154.742 96.512 155.766 97.792C156.875 99.072 158.369 99.712 160.246 99.712ZM234.707 12.544C233.427 12.544 231.976 14.1653 230.355 17.408C228.819 20.5653 227.326 25.0027 225.875 30.72C224.51 36.352 223.358 42.624 222.419 49.536C227.454 45.184 231.208 40.32 233.683 34.944C236.243 29.4827 237.523 24.5333 237.523 20.096C237.523 15.0613 236.584 12.544 234.707 12.544ZM275.101 64.896C271.944 64.896 269.256 66.7307 267.037 70.4C264.904 74.0693 263.837 78.5067 263.837 83.712V83.968C268.872 82.7733 272.84 80.9813 275.741 78.592C278.642 76.2027 280.093 73.4293 280.093 70.272C280.093 68.6507 279.624 67.3707 278.685 66.432C277.832 65.408 276.637 64.896 275.101 64.896ZM143.411 117.888C145.8 118.229 147.422 118.955 148.275 120.064C149.214 121.173 149.683 122.624 149.683 124.416C149.683 130.304 146.526 133.035 140.211 132.608L135.731 132.224C130.696 131.797 125.662 131.456 120.627 131.2C115.678 130.944 110.472 130.816 105.011 130.816H99.251C98.227 143.445 97.1603 154.965 96.051 165.376L118.067 164.992C121.224 164.992 123.315 165.547 124.339 166.656C125.448 167.765 126.003 169.259 126.003 171.136C126.003 174.037 125.15 176.341 123.443 178.048C121.736 179.669 119.304 180.48 116.147 180.48H94.259L93.491 185.984C91.699 200.064 87.859 210.091 81.971 216.064C76.1683 222.037 68.147 225.024 57.907 225.024C52.1043 225.024 46.771 223.787 41.907 221.312C37.043 218.752 33.459 215.68 31.155 212.096C30.2163 210.645 29.747 208.896 29.747 206.848C29.747 204.8 30.2163 203.008 31.155 201.472C32.179 199.936 33.4163 199.168 34.867 199.168C35.891 199.168 36.8723 199.509 37.811 200.192C38.835 200.875 40.115 202.197 41.651 204.16C45.747 209.536 50.8243 212.224 56.883 212.224C61.747 212.224 65.8003 210.261 69.043 206.336C72.371 202.325 74.5043 196.053 75.443 187.52L76.211 180.48H70.067C68.1043 180.48 66.3977 179.925 64.947 178.816C63.5817 177.707 62.899 176.128 62.899 174.08C62.899 171.435 63.5817 169.429 64.947 168.064C66.3123 166.613 68.3177 165.888 70.963 165.888C73.3523 165.888 75.699 165.845 78.003 165.76C79.027 156.373 80.1363 144.981 81.331 131.584C72.115 132.437 65.6297 133.931 61.875 136.064C58.1203 138.197 56.243 141.355 56.243 145.536C56.243 148.437 57.0963 151.211 58.803 153.856C59.315 154.624 59.571 155.392 59.571 156.16C59.571 157.696 58.7177 159.061 57.011 160.256C55.3043 161.365 53.3843 161.92 51.251 161.92C48.947 161.92 46.9843 161.237 45.363 159.872C44.339 159.019 43.3577 157.269 42.419 154.624C41.4803 151.979 41.011 149.035 41.011 145.792C41.011 135.211 46.4297 127.531 57.267 122.752C68.1897 117.973 84.1043 115.584 105.011 115.584C119.518 115.584 132.318 116.352 143.411 117.888ZM140.2 224.64C136.36 224.64 133.203 222.891 130.728 219.392C128.339 215.808 127.144 211.371 127.144 206.08C127.144 199.68 127.571 193.835 128.424 188.544C129.277 183.168 130.685 177.493 132.648 171.52C133.501 168.96 134.696 167.125 136.232 166.016C137.768 164.907 140.2 164.352 143.528 164.352C145.405 164.352 146.685 164.651 147.368 165.248C148.136 165.845 148.52 166.741 148.52 167.936C148.52 168.619 148.051 170.923 147.112 174.848C146.259 178.005 145.576 180.864 145.064 183.424C143.357 192.384 142.504 198.357 142.504 201.344C142.504 203.136 142.717 204.416 143.144 205.184C143.571 205.867 144.253 206.208 145.192 206.208C146.472 206.208 148.051 204.928 149.928 202.368C151.891 199.808 153.939 195.925 156.072 190.72C158.291 185.515 160.424 179.115 162.472 171.52C163.155 168.96 164.179 167.125 165.544 166.016C166.995 164.907 169.128 164.352 171.944 164.352C173.907 164.352 175.272 164.608 176.04 165.12C176.808 165.547 177.192 166.4 177.192 167.68C177.192 169.813 176.125 175.659 173.992 185.216C171.603 196.139 170.408 202.88 170.408 205.44C170.408 207.061 170.749 208.341 171.432 209.28C172.115 210.133 173.011 210.56 174.12 210.56C175.827 210.56 177.832 209.536 180.136 207.488C181.869 205.94 184.007 203.719 186.548 200.825C186.753 190.577 188.324 180.808 191.261 171.52C192.029 169.045 193.266 167.253 194.973 166.144C196.765 164.949 199.24 164.352 202.397 164.352C204.104 164.352 205.298 164.565 205.981 164.992C206.664 165.419 207.005 166.229 207.005 167.424C207.005 168.789 206.365 171.861 205.085 176.64C204.232 180.053 203.549 183.04 203.037 185.6C202.525 188.075 202.098 191.189 201.757 194.944C204.061 188.288 206.792 182.656 209.949 178.048C213.192 173.44 216.477 170.027 219.805 167.808C223.218 165.504 226.418 164.352 229.405 164.352C232.392 164.352 234.482 165.035 235.677 166.4C236.957 167.765 237.597 169.856 237.597 172.672C237.597 175.403 236.786 180.352 235.165 187.52C234.482 190.592 234.013 192.896 233.757 194.432C238.024 183.936 242.76 176.299 247.965 171.52C253.17 166.741 258.034 164.352 262.557 164.352C268.104 164.352 270.877 167.125 270.877 172.672C270.877 176 269.938 182.016 268.061 190.72C266.44 198.144 265.629 203.051 265.629 205.44C265.629 208.853 266.866 210.56 269.341 210.56C271.048 210.56 273.053 209.536 275.357 207.488C276.664 206.321 278.2 204.772 279.966 202.84C279.721 201.187 279.599 199.494 279.599 197.76C279.599 191.275 280.794 185.515 283.183 180.48C285.658 175.36 288.986 171.392 293.167 168.576C297.348 165.675 302.042 164.224 307.247 164.224C312.282 164.224 316.591 165.504 320.175 168.064C323.759 170.539 326.447 173.824 328.239 177.92C330.031 182.016 330.927 186.411 330.927 191.104C330.927 197.589 329.69 203.392 327.215 208.512C324.74 213.547 321.37 217.515 317.103 220.416C312.922 223.232 308.271 224.64 303.151 224.64C298.116 224.64 293.807 223.403 290.223 220.928C287.875 219.21 285.911 217.146 284.332 214.736C282.157 216.834 279.891 218.685 277.533 220.288C273.352 223.189 268.573 224.64 263.197 224.64C258.845 224.64 255.56 223.403 253.341 220.928C251.122 218.368 250.013 214.699 250.013 209.92C250.013 207.531 250.61 203.264 251.805 197.12C252.914 191.744 253.469 188.032 253.469 185.984C253.469 184.619 253 183.936 252.061 183.936C250.952 183.936 249.373 185.387 247.325 188.288C245.277 191.104 243.229 194.859 241.181 199.552C239.133 204.245 237.469 209.195 236.189 214.4C235.25 218.496 234.141 221.227 232.861 222.592C231.666 223.957 229.704 224.64 226.973 224.64C224.157 224.64 222.024 223.317 220.573 220.672C219.208 217.941 218.525 214.656 218.525 210.816C218.525 207.573 218.952 202.88 219.805 196.736C220.488 191.275 220.829 187.691 220.829 185.984C220.829 184.619 220.36 183.936 219.421 183.936C218.141 183.936 216.52 185.472 214.557 188.544C212.594 191.616 210.674 195.541 208.797 200.32C207.005 205.099 205.554 209.792 204.445 214.4C203.506 218.411 202.397 221.141 201.117 222.592C199.922 223.957 198.002 224.64 195.357 224.64C192.114 224.64 189.81 222.933 188.445 219.52C188.09 218.573 187.784 217.468 187.527 216.206C185.842 217.709 184.103 219.07 182.312 220.288C178.131 223.189 173.352 224.64 167.976 224.64C163.88 224.64 160.851 223.061 158.888 219.904C157.011 216.747 156.072 212.309 156.072 206.592C154.621 212.395 152.445 216.875 149.544 220.032C146.643 223.104 143.528 224.64 140.2 224.64ZM304.559 210.816C307.46 210.816 309.892 209.237 311.855 206.08C313.903 202.923 314.927 198.315 314.927 192.256C314.927 187.563 314.074 184.021 312.367 181.632C310.66 179.243 308.612 178.048 306.223 178.048C303.151 178.048 300.591 179.627 298.543 182.784C296.58 185.856 295.599 190.464 295.599 196.608C295.599 201.472 296.452 205.056 298.159 207.36C299.866 209.664 301.999 210.816 304.559 210.816ZM37.856 337.024C26.5067 337.024 17.4187 334.891 10.592 330.624C3.76533 326.272 0.352 319.659 0.352 310.784C0.352 306.091 1.16267 302.507 2.784 300.032C4.40533 297.557 6.79467 296.32 9.952 296.32C12.256 296.32 14.1333 296.917 15.584 298.112C17.0347 299.307 17.76 300.843 17.76 302.72C17.76 304.427 17.632 305.92 17.376 307.2C17.376 307.541 17.2907 308.139 17.12 308.992C17.0347 309.845 16.992 310.741 16.992 311.68C16.992 315.52 18.912 318.379 22.752 320.256C26.6773 322.133 32.1387 323.072 39.136 323.072C46.3893 323.072 52.064 321.792 56.16 319.232C60.256 316.587 62.304 312.917 62.304 308.224C62.304 305.323 61.3653 302.848 59.488 300.8C57.6107 298.667 55.264 296.917 52.448 295.552C49.632 294.101 45.664 292.352 40.544 290.304C33.9733 287.744 28.5973 285.312 24.416 283.008C20.32 280.704 16.7787 277.589 13.792 273.664C10.8907 269.653 9.44 264.704 9.44 258.816C9.44 252.672 11.0613 247.211 14.304 242.432C17.632 237.653 22.368 233.941 28.512 231.296C34.7413 228.651 42.0373 227.328 50.4 227.328C56.6293 227.328 62.3467 228.267 67.552 230.144C72.7573 231.936 76.896 234.709 79.968 238.464C83.1253 242.219 84.704 246.827 84.704 252.288C84.704 257.664 83.8933 261.717 82.272 264.448C80.6507 267.179 78.2613 268.544 75.104 268.544C72.8853 268.544 71.008 267.861 69.472 266.496C68.0213 265.131 67.296 263.509 67.296 261.632C67.296 260.011 67.424 258.517 67.68 257.152C67.936 254.592 68.064 252.971 68.064 252.288C68.064 248.704 66.3147 245.973 62.816 244.096C59.3173 242.219 54.9653 241.28 49.76 241.28C42.4213 241.28 36.7893 242.645 32.864 245.376C29.024 248.021 27.104 251.776 27.104 256.64C27.104 259.883 28.0853 262.656 30.048 264.96C32.096 267.264 34.6133 269.184 37.6 270.72C40.5867 272.256 44.768 274.091 50.144 276.224C56.6293 278.869 61.8347 281.259 65.76 283.392C69.6853 285.525 73.0133 288.427 75.744 292.096C78.56 295.765 79.968 300.288 79.968 305.664C79.968 315.733 76.128 323.499 68.448 328.96C60.8533 334.336 50.656 337.024 37.856 337.024ZM137.974 309.76C137.974 311.432 138.089 313.062 138.319 314.65C136.493 316.503 134.817 318.03 133.292 319.232C130.476 321.451 127.233 322.56 123.564 322.56C119.041 322.56 115.713 320.768 113.58 317.184C111.532 313.6 110.508 307.371 110.508 298.496C110.508 296.107 110.593 292.779 110.764 288.512H126.38C136.023 288.512 140.844 285.568 140.844 279.68C140.844 278.059 140.545 276.949 139.948 276.352C139.351 275.755 138.369 275.456 137.004 275.456H122.668C133.761 265.643 139.308 254.123 139.308 240.896C139.308 236.117 138.284 232.149 136.236 228.992C134.188 225.835 131.372 224.256 127.788 224.256C122.924 224.256 118.359 226.56 114.092 231.168C109.911 235.776 106.327 241.963 103.34 249.728C100.353 257.493 98.1347 266.069 96.684 275.456H89.388C85.548 275.456 83.628 277.845 83.628 282.624C83.628 284.672 84.0547 286.165 84.908 287.104C85.8467 288.043 87.596 288.512 90.156 288.512H95.148C94.892 292.352 94.764 296.149 94.764 299.904C94.764 324.395 103.468 336.64 120.876 336.64C126.508 336.64 131.5 335.189 135.852 332.288C138.276 330.672 140.595 328.804 142.807 326.685C144.463 329.148 146.521 331.229 148.982 332.928C152.651 335.403 157.046 336.64 162.166 336.64C168.225 336.64 173.643 334.507 178.422 330.24C183.201 325.888 186.401 320.128 188.022 312.96C191.494 312.815 194.803 312.425 197.948 311.79C197.916 312.9 197.9 314.015 197.9 315.136C197.9 322.645 198.54 328.107 199.82 331.52C201.185 334.933 203.489 336.64 206.732 336.64C209.377 336.64 211.297 335.957 212.492 334.592C213.772 333.141 214.881 330.411 215.82 326.4C217.1 321.195 218.764 316.245 220.812 311.552C222.86 306.859 224.908 303.104 226.956 300.288C229.089 297.387 230.796 295.936 232.076 295.936C233.015 295.936 233.484 296.619 233.484 297.984C233.484 298.581 233.399 299.733 233.228 301.44C232.972 302.72 232.844 304 232.844 305.28C232.844 309.205 233.996 312.32 236.3 314.624C238.689 316.928 242.145 318.08 246.668 318.08C249.441 318.08 252.087 317.569 254.604 316.547C255.563 321.638 257.614 325.903 260.758 329.344C265.281 334.208 271.638 336.64 279.83 336.64C285.206 336.64 289.814 335.616 293.654 333.568C297.579 331.52 300.737 328.661 303.126 324.992C304.577 322.773 305.302 320.128 305.302 317.056C305.302 315.264 304.961 313.856 304.278 312.832C303.681 311.808 302.827 311.296 301.718 311.296C300.438 311.296 299.286 311.936 298.262 313.216C295.275 317.056 292.63 319.787 290.326 321.408C288.107 323.029 285.249 323.84 281.75 323.84C276.886 323.84 273.43 321.877 271.382 317.952C281.537 315.477 288.705 312.149 292.886 307.968C297.153 303.701 299.286 298.624 299.286 292.736C299.286 287.701 297.793 283.733 294.806 280.832C291.819 277.845 287.851 276.352 282.902 276.352C277.355 276.352 272.363 277.845 267.926 280.832C263.574 283.819 260.161 287.872 257.686 292.992C256.156 296.105 255.099 299.381 254.515 302.821C253.424 303.351 252.43 303.616 251.532 303.616C249.399 303.616 248.332 302.123 248.332 299.136C248.332 298.283 248.673 296.149 249.356 292.736C250.124 288.469 250.508 285.781 250.508 284.672C250.508 279.125 247.735 276.352 242.188 276.352C239.372 276.352 236.257 277.333 232.844 279.296C229.516 281.259 226.103 284.544 222.604 289.152C219.105 293.76 215.948 299.733 213.132 307.072C213.473 303.317 213.9 300.16 214.412 297.6C214.924 295.04 215.607 292.053 216.46 288.64C217.74 283.861 218.38 280.789 218.38 279.424C218.38 278.229 218.039 277.419 217.356 276.992C216.673 276.565 215.479 276.352 213.772 276.352C210.615 276.352 208.14 276.949 206.348 278.144C204.641 279.253 203.404 281.045 202.636 283.52C201.152 288.213 200.017 293.028 199.23 297.966C195.413 298.812 192.019 299.33 189.046 299.52C188.363 292.949 186.017 287.445 182.006 283.008C178.081 278.485 172.875 276.224 166.39 276.224C161.099 276.224 156.278 277.675 151.926 280.576C147.574 283.392 144.161 287.36 141.686 292.48C139.211 297.515 137.974 303.275 137.974 309.76ZM124.332 236.544C123.052 236.544 121.601 238.165 119.98 241.408C118.444 244.565 116.951 249.003 115.5 254.72C114.135 260.352 112.983 266.624 112.044 273.536C117.079 269.184 120.833 264.32 123.308 258.944C125.868 253.483 127.148 248.533 127.148 244.096C127.148 239.061 126.209 236.544 124.332 236.544ZM163.19 323.072C165.921 323.072 168.267 321.963 170.23 319.744C172.278 317.525 173.643 314.325 174.326 310.144C171.681 308.352 169.633 306.005 168.182 303.104C166.817 300.203 166.134 297.131 166.134 293.888C166.134 292.523 166.262 291.157 166.518 289.792H165.878C162.465 289.792 159.606 291.456 157.302 294.784C155.083 298.027 153.974 302.635 153.974 308.608C153.974 313.301 154.87 316.885 156.662 319.36C158.539 321.835 160.715 323.072 163.19 323.072ZM280.726 288.896C277.569 288.896 274.881 290.731 272.662 294.4C270.529 298.069 269.462 302.507 269.462 307.712V307.968C274.497 306.773 278.465 304.981 281.366 302.592C284.267 300.203 285.718 297.429 285.718 294.272C285.718 292.651 285.249 291.371 284.31 290.432C283.457 289.408 282.262 288.896 280.726 288.896ZM363.912 280.544C376.547 280.544 386.176 284.531 392.8 292.504C399.547 300.355 402.92 311.272 402.92 325.256C402.92 337.768 400.773 348.869 396.48 358.56C392.309 368.128 386.299 375.611 378.448 381.008C370.72 386.283 361.643 388.92 351.216 388.92C341.771 388.92 333.981 386.773 327.848 382.48C321.837 378.064 318.403 372.299 317.544 365.184L317.36 363.16C317.36 359.971 318.341 357.517 320.304 355.8C322.389 353.96 325.272 353.04 328.952 353.04C331.651 353.04 333.797 353.776 335.392 355.248C337.109 356.597 338.581 358.989 339.808 362.424C340.789 365 342.384 367.024 344.592 368.496C346.923 369.968 349.805 370.704 353.24 370.704C360.355 370.704 366.12 367.944 370.536 362.424C375.075 356.781 377.896 348.44 379 337.4C375.811 341.08 372.192 343.717 368.144 345.312C364.096 346.784 359.619 347.52 354.712 347.52C348.579 347.52 343.059 346.232 338.152 343.656C333.368 341.08 329.627 337.523 326.928 332.984C324.229 328.323 322.88 323.171 322.88 317.528C322.88 310.536 324.475 304.28 327.664 298.76C330.976 293.117 335.699 288.701 341.832 285.512C348.088 282.2 355.448 280.544 363.912 280.544ZM360.232 329.12C365.507 329.12 369.616 327.648 372.56 324.704C375.504 321.76 376.976 317.835 376.976 312.928C376.976 308.512 375.749 305.016 373.296 302.44C370.843 299.864 367.408 298.576 362.992 298.576C358.085 298.576 354.099 300.171 351.032 303.36C348.088 306.427 346.616 310.475 346.616 315.504C346.616 319.675 347.843 322.987 350.296 325.44C352.749 327.893 356.061 329.12 360.232 329.12ZM334 444C277.529 444 230.093 405.315 216.748 353H234.392C247.269 395.812 286.992 427 334 427C391.438 427 438 380.438 438 323C438 268.254 395.7 223.388 342 219.303V202.26C405.097 206.379 455 258.862 455 323C455 389.826 400.826 444 334 444Z"
      />
    </svg>
  );
}
