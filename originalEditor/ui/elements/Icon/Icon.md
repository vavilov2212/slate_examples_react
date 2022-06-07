### Описание

Новые икнока добавляются как новый компонент. По аналогии с тем как это сделано c IconSettings, IconThemeLight и другие. Основные принципы:

* Создаете новую папку, название должно быть Icon[Name]
* Создаете компонент, название такое же как и у папки
* Рядом в папке кладете иконку
* Через сервис https://jakearchibald.github.io/svgomg/ иконку оптимизируете
* Если у иконки есть состояние Normal, Hover и другие, нужно удалить все аттрибуты fill в файле svg
    * В компоненте добавить параметр *hasState*

Примеры:

```jsx
<div style={{ backgroundColor: 'lightgray' }}>
  <IconThemeLight/>
  <IconThemeDark />
  <IconSettings />
  <IconHelp />
  <IconCloud />
  <IconEditFilled />
  <IconImagePlaceholder/>
  <IconRefresh/>
  <IconTrashBin/>
  <IconAdd />
  <IconAlert />
  <IconAlertWhite />
  <IconAttention />
  <IconSuccess />
  <IconAttentionWhite />
  <IconSuccessWhite />
  <IconLogout />
  <IconFavorite />
  <IconFavorite active={true} />
  <IconPlay />
  <IconSearchWhite />
  <IconTrendArrow />
  <IconArrow />
  <IconArrow2 />
  <IconArrowLong />  
  <IconNavArrow />
  <IconCloseV3 />
  <IconClose />
  <IconClaim />
  <IconOco />
  <IconBurger />
  <IconCloseWhite />
  <IconCalendar />
  <IconCheck />
  <IconCopy />
  <IconEye />
  <IconFilter />  
  <IconLogoSmall />
  <IconLogo />
  <IconLogoHallon />
  <IconPlus />
  <IconReturn />
  <IconSocial service="facebook"/>
  <IconSocial service="twitter"/>
  <IconSocial service="discord"/>
  <IconSocial service="medium"/>
  <IconSocial service="bitcointalk"/>
  <IconSocial service="reddit"/>
  <IconTrade />
  <IconLink />
  <IconBucks />
  <IconBucksWithdraw />

  <div>
    <IconAppStore size="l"/>
    <IconGooglePlay size="l"/>
  </div>

  <div>
    <IconThemeLight size="s" />
    <IconSorting size="s" />
    <IconSortingSingle />
  </div>
  <div>
    <h3>Выбранный элемент</h3>
    <IconSettings active={true} />
  </div>
  
  <IconPreloader />
  <IconQrCode />
</div>
```
