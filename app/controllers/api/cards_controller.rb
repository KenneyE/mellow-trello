module Api
  class CardsController < ApiController
    def index
      @cards = List.find(params[:list_id]).cards
      render :index
    end

    def show
      @card = Card.find(params[:id])
      render partial: "api/cards/card", locals: { card: @card }
    end

    def create
      @card = Card.new(card_params)
      if @card.save
        render partial: "api/cards/card", locals: { card: @card }
      else
        render json: { errors: @card.errors.full_messages }, status: 422
      end
    end

    def update
      @card = Card.find(params[:id])

      if params[:newUserEmail]
        email = params[:newUserEmail]
        new_user = User.find_by_email(email)
        new_user && !@card.users.include?(new_user) && @card.users << new_user
      end

      if @card.update_attributes(card_params)
        render partial: "api/cards/card", locals: { card: @card }
      else
        render json: { errors: @card.errors.full_messages }, status: 422
      end
    end

    def destroy
      Card.find(params[:id]).try(:destroy)
      render json: nil
    end

    private
    def card_params
      params.require(:card).permit(:title, :description, :rank, :list_id)
    end
  end
end
