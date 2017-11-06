import ReactSelector from 'testcafe-react-selectors'


fixture `Simple Test`
  .page `http://localhost:${process.env.PORT}`

test('App component\'s structure', async t => {
  await t.expect(ReactSelector('App InputBox').exists).ok()
  await t.expect(ReactSelector('App ul').exists).ok()
})

test('InputBox component\'s structure', async t => {
  const input = ReactSelector('InputBox').find('input[type=text]')
  const submit = ReactSelector('InputBox').find('input[type=submit]')

  await t
    .expect(input.exists).ok()
    .expect(submit.exists).ok()

  const attrs = await input.attributes

  await t
    .expect(attrs.maxlength).eql('255')
    .expect(attrs.required).eql('')
})

test('add a topic', async t => {
  const input = ReactSelector('InputBox').find('input[type=text]')
  const submit = ReactSelector('InputBox').find('input[type=submit]')

  await t
    .typeText(input, 'Hello World!')
    .click(submit)

  const topics = ReactSelector('TopicListItem')
  const title = topics.nth(-1).find('.topic-list-item__title')

  await t
    .expect(title.innerText).eql('Hello World!')
    .expect(input.value).eql('', 'input should be empty after submit')
})

test('upvote a topic', async t => {
  const topic = ReactSelector('TopicListItem').nth(-1)
  const title = topic.find('.topic-list-item__title')
  const votes = topic.find('.topic-list-item__votes')
  const upvoteBtn = topic.find('button').nth(0)

  await t
    .expect(title.innerText).eql('Hello World!')
    .expect(votes.innerText).eql('0')
    .click(upvoteBtn)
    .expect(votes.innerText).eql('1')
    .click(upvoteBtn)
    .click(upvoteBtn)
    .expect(votes.innerText).eql('3')
})

test('downvote a topic', async t => {
  const topic = ReactSelector('TopicListItem').nth(-1)
  const title = topic.find('.topic-list-item__title')
  const votes = topic.find('.topic-list-item__votes')
  const downvoteBtn = topic.find('button').nth(1)

  await t
    .expect(title.innerText).eql('Hello World!')
    .expect(votes.innerText).eql('3')
    .click(downvoteBtn)
    .expect(votes.innerText).eql('2')
    .click(downvoteBtn)
    .click(downvoteBtn)
    .expect(votes.innerText).eql('0')
    .click(downvoteBtn)
    .expect(votes.innerText).eql('0')
})

test('to be sorted', async t => {
  const input = ReactSelector('InputBox').find('input[type=text]')
  const submit = ReactSelector('InputBox').find('input[type=submit]')
  const topics = ReactSelector('TopicListItem')

  await t
    .typeText(input, 'Testcafe is awesome!')
    .click(submit)
    .typeText(input, '工時減一半，覺得會更有效率嗎？覺得會按 +1 不會按 -1')
    .click(submit)
    .expect(topics.count).eql(3)
    .click(topics.withText('Testcafe').find('button').nth(0))
    .click(topics.withText('Testcafe').find('button').nth(0))
    .click(topics.withText('工時減一半').find('button').nth(0))
    .expect(topics.nth(0).withText('Testcafe').exists).ok()
    .expect(topics.nth(1).withText('工時減一半').exists).ok()
    .click(topics.withText('工時減一半').find('button').nth(0))
    .click(topics.withText('工時減一半').find('button').nth(0))
    .expect(topics.nth(0).withText('工時減一半').exists).ok()
    .expect(topics.nth(2).withText('Hello World!').exists).ok()
    .click(topics.withText('Hello World!').find('button').nth(0))
    .click(topics.withText('Testcafe').find('button').nth(1))
    .click(topics.withText('Testcafe').find('button').nth(1))
    .expect(topics.nth(2).withText('Testcafe').exists).ok()
})

test('always returns top 20 topics', async t => {
  const input = ReactSelector('InputBox').find('input[type=text]')
  const submit = ReactSelector('InputBox').find('input[type=submit]')
  const topics = ReactSelector('TopicListItem')

  await t
    .expect(topics.count).eql(3)

  for (let i = 0; i < 20; i += 1) {
    /* eslint no-await-in-loop: [0] */
    await t
      .typeText(input, `#${i}`)
      .click(submit)
  }

  await t
    .expect(topics.count).eql(20)
})
