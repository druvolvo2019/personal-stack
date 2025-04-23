<template>
  <div class="col-3">
    <q-card
      bordered
    >
      <q-card-section>
        <div class="row">
          <div class="text-h6">Ratings from School Staff and Observers</div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-rating
                color="yellow-14"
                icon="las la-star"
                icon-half="las la-star-half-alt"
                readonly
                size="1.5em"
                :value="4"
              />
            </q-item-label>
            <q-item-label caption>
              3 ratings from school staff and observers
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            4.2 out of 5
          </q-item-section>
        </q-item>
        <q-list dense>
          <q-item>
            <q-item-section side>
              5 star
            </q-item-section>
            <q-item-section>
               <q-linear-progress size="1.5em" :value="0.33" color="yellow-14"/>
            </q-item-section>
            <q-item-section side>
              33%
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              4 star
            </q-item-section>
            <q-item-section>
               <q-linear-progress size="1.5em" :value="0.33" color="yellow-14"/>
            </q-item-section>
            <q-item-section side>
              33%
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              3 star
            </q-item-section>
            <q-item-section>
               <q-linear-progress size="1.5em" :value="0.33" color="yellow-14"/>
            </q-item-section>
            <q-item-section side>
              33%
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              2 star
            </q-item-section>
            <q-item-section>
               <q-linear-progress size="1.5em" :value="0" color="yellow-14"/>
            </q-item-section>
            <q-item-section side>
              &#8194;0%
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              1 star
            </q-item-section>
            <q-item-section>
               <q-linear-progress size="1.5em" :value="0" color="yellow-14"/>
            </q-item-section>
            <q-item-section side>
              &#8194;0%
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-separator inset></q-separator>
          <q-item>
            <q-item-section>
              <q-item-label>Marilyn Bernard</q-item-label>
              <q-item-label caption>Principal</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-rating
                  color="yellow-14"
                  icon="las la-star"
                  icon-half="las la-star-half-alt"
                  readonly
                  size="1.5em"
                  :value="4.5"
                />
              </q-item-label>
              <q-item-label caption>
                2 days ago
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            Dixon Middle School was proud to be selected for NAEP, and the experience was smooth.
          </q-item>
          <q-separator inset></q-separator>
          <q-item>
            <q-item-section>
              <q-item-label>Tom Hitchens</q-item-label>
              <q-item-label caption>School Coordinator</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-rating
                  color="yellow-14"
                  icon="las la-star"
                  icon-half="las la-star-half-alt"
                  readonly
                  size="1.5em"
                  :value="3"
                />
              </q-item-label>
              <q-item-label caption>
                5 days ago
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            Everything was great on assessment day, and Sally was wonderful, but entering in all of the information beforehand took far longer than I expected.
          </q-item>
          <q-separator inset></q-separator>
          <q-item>
            <q-item-section>
              <q-item-label>Eunice Greer</q-item-label>
              <q-item-label caption><q-badge>NCES OBSERVER</q-badge></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-rating
                  color="yellow-14"
                  icon="las la-star"
                  icon-half="las la-star-half-alt"
                  readonly
                  size="1.5em"
                  :value="5"
                />
              </q-item-label>
              <q-item-label caption>
                5 days ago
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            Thanks to our Westat colleagues, the assessment was flawless.
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
