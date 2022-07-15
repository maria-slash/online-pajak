<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container fluid>
    <div
      class="text-h5 grey--text mb-3 font-weight-bold"
      v-text="title"
    />
    <div>
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        absolute
        rounded
        right
        top
      >
        {{ snackbarText }}
      </v-snackbar>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title class="grey--text">
            {{ subtitle }}
          </v-toolbar-title>
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                color="red darken-1"
                class="mb2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="white">
                  mdi-plus
                </v-icon>
                <div class="white--text">
                  Tambah
                </div>
              </v-btn>
            </template>
            <v-form ref="form" v-model="valid">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <div class="ml-2 mt-4 mb-2 font-italic" color="black">
                    * Field wajib isi
                  </div>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <div>NPWP *</div>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          v-model="item.npwp"
                          v-mask="'##.###.###.#-###.###'"
                          placeholder="__.___.___._-___.___"
                          :rules="[
                            v => !!v || 'NPWP is required',

                          ]"
                          outlined
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <div>Nama Penandatangan SPT *</div>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          v-model="item.name"
                          outlined
                          required
                          :rules="[
                            v => !!v || 'Nama is required',
                          ]"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <div>Bertindak sebagai *</div>
                      </v-col>
                      <v-radio-group
                        v-model="item.signatory"
                        row
                        :rules="[v => !!v || 'Bertindak sebagai is required']"
                        required
                      >
                        <v-radio
                          value="TAXPAYER"
                          color="red"
                        >
                          <template v-slot:label>
                            <div class="text-body-2">
                              Wajib Pajak
                            </div>
                          </template>
                        </v-radio>
                        <v-radio
                          value="AUTHORIZED_REPRESENTATIVE"
                          color="red"
                        >
                          <template v-slot:label>
                            <div class="text-body-2">
                              Kuasa
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <div>Status Wajib Pajak *</div>
                      </v-col>

                      <v-radio-group
                        v-model="item.statusTaxpayer"
                        row
                        class="text-body-2"
                        :rules="[v => !!v || 'Status is required']"
                      >
                        <v-radio
                          value="ACTIVE"
                          color="red"
                        >
                          <template v-slot:label>
                            <div class="text-body-2">
                              Aktif
                            </div>
                          </template>
                        </v-radio>
                        <v-radio
                          value="NOT_ACTIVE"
                          color="red"
                        >
                          <template v-slot:label>
                            <div class="text-body-2">
                              Tidak Aktif
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-row>
                    <v-row>
                      <v-checkbox
                        v-model="item.defaultSignatory"
                        color="red"
                      >
                        <template v-slot:label>
                          <div class="text-body-2">
                            Jadikan sebagai default
                          </div>
                        </template>
                      </v-checkbox>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="grey--text my-3"
                    plain
                    @click="close"
                  >
                    Batal
                  </v-btn>
                  <v-btn
                    color="red darken-1 white--text my-3"
                    class="px-4"

                    @click="save"
                  >
                    Simpan
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{item}">
        <v-btn
          color="grey"
          outlined
          @click="editItem(item)"
        >
          <v-icon color="red" left small>
            mdi-application-edit-outline
          </v-icon>
          <span class="red--text">Edit</span>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Provide, mixins } from 'nuxt-property-decorator'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { HEADERS, TITLE, SUBTITLE, FORM_TITLE, STATUS, SIGNATORY } from '~/utils/const'
import { Item } from '~/api/dto'

@Component({
  computed: {
    ...mapGetters({ itemsStore: 'getAllItems' }),
    form (): VForm {
      return this.$refs.form as VForm
    }

  }
})
class IndexPage extends Vue {
  @Provide()
  public loading: boolean = false

  public editedIndex: number = -1
  public title = TITLE
  public subtitle = SUBTITLE
  public formTitle = `Tambah ${FORM_TITLE}`
  public valid = true
  public headers = HEADERS
  public dialog: boolean = false
  public snackbar: boolean = false
  public snackbarText: string = ''
  public snackbarColor: string = 'green'
  public isError: boolean = false
  public item: Item = {
    id: '',
    name: '',
    npwp: '',
    statusTaxpayer: '',
    signatory: '',
    defaultSignatory: false
  }

  public items: {
    id: string;
    name: string;
    npwp: string;
    statusTaxpayer: string;
    signatory: string;
    defaultSignatory: boolean;
  }[] = []

  mounted () {
    this.fetchItems()
  }

  async asyncDataProxy () {
    return _.pick(this, ['loading', 'items'])
  }

  async fetchItems () {
    try {
      await this.$store.dispatch('fetchItems', {})
      this.mapItems()
    } catch (error) {
    }
  }

  close () {
    this.dialog = false
    this.reset()
    this.resetValidation()
  }

  mapItems () {
    this.items = this.$store.state.items.map((tax: any) => {
      const { statusTaxpayer, signatory, ...restOfItem } = tax
      return {
        ...restOfItem,
        statusTaxpayer: statusTaxpayer === 'ACTIVE' ? STATUS.ACTIVE : STATUS.NOT_ACTIVE,
        signatory: signatory === 'TAXPAYER' ? 'Wajib Pajak' : 'Kuasa'
      }
    })
  }

  editItem (item: Item) {
    this.editedIndex = this.items.indexOf(item)
    this.item = Object.assign({}, item)
    this.item.statusTaxpayer = item.statusTaxpayer === STATUS.ACTIVE ? 'ACTIVE' : 'NOT_ACTIVE'
    this.item.signatory = item.signatory === SIGNATORY.TAXPAYER ? 'TAXPAYER' : 'AUTHORIZED_REPRESENTATIVE'
    this.item.npwp = this.checkNpwp(item.npwp.toString())
      ? item.npwp.toString().replace(/^(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.$4-$5.$6')
      : item.npwp
    this.formTitle = `Edit ${FORM_TITLE}`
    this.dialog = true
  }

  checkNpwp (value: string) {
    return /^-?\d+$/.test(value) && value.length === 15
  }

  async save () {
    this.form.validate()
    const { id, npwp, ...restOfItem } = this.item
    const reg = /[.-]/g
    const newStr = npwp.replace(reg, '')
    const body = { ...restOfItem, npwp: Number(newStr) }
    if (id) {
      await this.$store.dispatch('editItem', { id, body })
    } else {
      await this.$store.dispatch('addItem', body)
    }

    if (this.$store.state.isError) {
      this.setSnackBar('Failed save', 'red')
    } else {
      this.mapItems()
      this.close()
      this.setSnackBar('Success save', 'green')
    }
  }

  setSnackBar (title: string, color: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarText = title
    setTimeout(() => {
      this.snackbar = false
    }, 500)
  }

  reset () {
    this.item = {
      id: '',
      name: '',
      npwp: '',
      statusTaxpayer: '',
      signatory: '',
      defaultSignatory: false
    }
  }

  resetValidation () {
    this.form.resetValidation()
  }
}
export default class extends mixins(IndexPage) {
  async asyncData () {
    return await new IndexPage().asyncDataProxy()
  }
}
</script>
<style lang="scss">

</style>
