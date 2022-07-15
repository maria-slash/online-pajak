export const enum STATUS {
  ACTIVE = 'Aktif',
  NOT_ACTIVE = 'Tidak Aktif'
}
export const enum SIGNATORY {
  TAXPAYER = 'Wajib Pajak',
  AUTHORIZED_REPRESENTATIVE = 'Kuasa'
}
export const TITLE = 'Penandatangan SPT'
export const SUBTITLE = 'Tambah dan edit daftar Penandatangan SPT Anda'
export const FORM_TITLE = 'Penandatangan SPT'
export const HEADERS = [{
  text: 'NPWP',
  align: 'start',
  sortable: false,
  value: 'npwp'

},
{
  text: 'Nama',
  sortable: false,
  value: 'name'

},
{
  text: 'Sebagai',
  sortable: false,
  value: 'signatory'

},
{
  text: 'Status',
  sortable: false,
  value: 'statusTaxpayer'

},
{
  text: 'Default',
  sortable: false,
  value: 'defaultSignatory'

},
{
  text: '',
  sortable: false,
  value: 'actions'

}
]
