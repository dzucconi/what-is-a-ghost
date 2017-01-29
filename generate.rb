require 'mechanize'

message = 'a tragedy doomed to repeat itself?'
amount = iter = 500
limit = 5
agent = Mechanize.new

def say(agent, message, limit)
  agent.get("http://www.cs.toronto.edu/~graves/handwriting.cgi?text=#{message}&style=&bias=0.15&samples=#{limit}")
end

def save(message, i, src)
  begin
    Dir.mkdir "img/#{message}"
  rescue
    # Ignore
  end

  File.open("app/assets/img/#{message}/#{i}.jpeg", 'wb') do |f|
    f.write(Base64.decode64(src['data:image/jpeg;base64,'.length .. -1]))
  end
end

(amount / limit).times do |n|
  puts "Fetching set: #{n}"
  page = say(agent, message, limit)

  page.images.last(limit).each_with_index do |img, i|
    puts "Saving: #{i}"
    save(message, iter, img.src)
    iter -= 1
  end

  sleep 1
end
